const express = require('express');
const concat = require('concat');
const router = express.Router();
const Group = require('../models/group');
const Member = require('../models/member');
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

//-----------------------------------------------Watson-----------------------------------------------//


const personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    iam_apikey: 'ITHx8SQNN6fwhMr1s_7yWZE6J8I6jFqqsncujo_yHCZa',
    url: 'https://gateway.watsonplatform.net/personality-insights/api/'
});

const profileParams = {
    content: 'Hola',
    content_type: 'text/plain',
    consumption_preferences: true,
    raw_scores: true,
    content_language: 'es',
    accept_language: 'es'
};

var text = " ";

router.put('/members/personality/:id', async (req, res) => {
    text = req.body.description + ". " + req.body.profile + ". " + req.body.projects + ". " + req.body.qualities + ". " + req.body.achievement + ".";
    profileParams.content = text;
    personalityInsights.profile(profileParams, async function (err, response) {
        if (err) {
            console.log('error:', err);
        } else {
            req.body.personality = response;
            const { personality, sex, document } = req.body;
            var user = { personality, sex, document };
            await Member.findByIdAndUpdate(req.params.id, user);
            res.json({ status: 'User saved' });
        }
    });
});
//---------------------------------------------------------Routes---------------------------------------------------///-------------funcionAux--------------------------------------------------


//--------------Create gruop --------------------------------------------------
router.post('/members/:id/groups', async (req, res) => {
    var id_member = req.params.id;
    req.body.members = [{ "member": id_member }];
    const { name, numberMembers, members } = req.body;
    var group = new Group({ name, numberMembers, members });
    var actualGroups = await Member.findById(id_member);//.groups
    var toAdd = { "group": group };
    var grupitos = actualGroups.groups.concat(toAdd); //concat([actualGroups.groups, toAdd]);
    Member.findOneAndUpdate({ _id: id_member }, { $set: { groups: grupitos } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    }),

        await group.save();

    res.json({ status: 'group created by : ' + id_member });

})

//--------------Post member within personility---------------------------------------
router.post('/members', async (req, res) => {

    var age = "";
    var sex = "";
    var document = "";
    var personality = "";
    const { name, email, password, repassword } = req.body;
    var newMember = new Member({ name, email, password, repassword, age, sex, document, personality });
    await newMember.save();
    res.json({ status: 'member saved' });

})

//---------------- Evaluate group------------------------------------------------

router.get('/groups/:id/eval', async (req, res) => {

    var group = await Group.findById(req.params.id);
    console.log('Group------------------ ' + group);
    var id_members = group.members;

    var members = [];
    var z = 0;
    while (z < id_members.length) {
        members[z] = await Member.findById(id_members[z].member);
        z++;
    }
    console.log('Members------------------ ' + members);
    var personalities = [];
    var i = 0;
    while (i < members.length) {
        if (members[i].personality != null) {
            var percents = [
                //Apertura
                members[i].personality.personality[0].raw_score,
                //Responsabilidad
                members[i].personality.personality[1].raw_score,
                //Extroversion
                members[i].personality.personality[2].raw_score,
                //Amabilidad
                members[i].personality.personality[3].raw_score,
                //Neuro
                members[i].personality.personality[4].raw_score
            ];
            personalities[i] = percents;
        }
        i++;
    }
    console.log('Personalities -------------------- ' + personalities);
    var j = 0;
    var aperturaCambioGrupo = 0;
    var responsabilidadGrupo = 0;
    var extroversionGrupo = 0;
    var amabilidadGrupo = 0;
    var necGrupo = 0;

    while (j < personalities.length) {
        aperturaCambioGrupo += personalities[j][0];
        responsabilidadGrupo += personalities[j][1];
        extroversionGrupo += personalities[j][2];
        amabilidadGrupo += personalities[j][3];
        necGrupo += personalities[j][4];
        j++;
    }
    aperturaCambioGrupo = aperturaCambioGrupo/personalities.length;
    responsabilidadGrupo = responsabilidadGrupo/personalities.length;
    extroversionGrupo = extroversionGrupo/personalities.length;
    amabilidadGrupo = amabilidadGrupo/personalities.length;
    necGrupo = necGrupo/personalities.length;

    var groupPercentajes = [aperturaCambioGrupo,responsabilidadGrupo,extroversionGrupo,amabilidadGrupo,necGrupo];

    console.log('GroupPercentajes.................' +groupPercentajes)
    await Group.findOneAndUpdate({ _id: req.params.id }, { $set: { percentajes: groupPercentajes } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong with the group percentajes!");
        }
        console.log(doc);
    }),
    res.json();

})


/** --------------------- Add member a group----------------------------------------*/
router.put('/groups/:id', async (req, res) => {

    //Add member to Group
    var actualMembers = await Group.findById(req.params.id);
    var toAdd = req.body.members[0].member;
    console.log(actualMembers.members + '************')
    console.log('---------------------' + req.body.members[0].member)
    var newMembers = actualMembers.members.concat({ "member": toAdd });
    await Group.findOneAndUpdate({ _id: req.params.id }, { $set: { members: newMembers } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });

    //Add group to member
    var group = await Group.findById(req.params.id);
    var actualGroups = await Member.findById(toAdd);//.groups
    console.log('*************' + group)
    console.log(actualGroups)
    var newGroup = { "group": group };
    console.log(',,,,,,,,,,,,,,,' + newGroup)
    var grupitos = actualGroups.groups.concat(newGroup);
    console.log('------------------------' + grupitos + '.........')
    await Member.findOneAndUpdate({ _id: toAdd }, { $set: { groups: grupitos } }, { new: true }, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
    }),
        res.json({ status: 'Group updated' });

});




router.delete('members/:id', async (req, res) => {
    await Member.findByIdAndDelete(req.params.id);
    res.json('Member deleted');
});

router.delete('groups/:id', async (req, res) => {
    await Group.findByIdAndDelete(req.params.id);
    res.json('Group deleted');
});

router.get('/members/:id', async (req, res) => {
    const user = await Member.findById(req.params.id);
    res.json(user);
});
router.get('/members/:id/groups', async (req, res) => {
    const user = await Member.findById(req.params.id);
    res.json(user.groups);
});
router.get('/members', async (req, res) => {
    const user = await Member.find();
    res.json(user);
});

router.get('/groups', async (req, res) => {
    const user = await Group.find();
    res.json(user);
});

router.get('/groups/:id', async (req, res) => {
    const user = await Group.findById(req.params.id);
    res.json(user);
});

module.exports = router;