

const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises; // 使用 Promises API
const path = require('path');
const snarkjs = require('snarkjs');

const vKeyfor12345 = {
  "protocol": "groth16",
  "curve": "bn128",
  "nPublic": 4,
  "vk_alpha_1": [
    "20491192805390485299153009773594534940189261866228447918068658471970481763042",
    "9383485363053290200918347156157836566562967994039712273449902621266178545958",
    "1"
  ],
  "vk_beta_2": [
    [
      "6375614351688725206403948262868962793625744043794305715222011528459656738731",
      "4252822878758300859123897981450591353533073413197771768651442665752259397132"
    ],
    [
      "10505242626370262277552901082094356697409835680220590971873171140371331206856",
      "21847035105528745403288232691147584728191162732299865338377159692350059136679"
    ],
    [
      "1",
      "0"
    ]
  ],
  "vk_gamma_2": [
    [
      "10857046999023057135944570762232829481370756359578518086990519993285655852781",
      "11559732032986387107991004021392285783925812861821192530917403151452391805634"
    ],
    [
      "8495653923123431417604973247489272438418190587263600148770280649306958101930",
      "4082367875863433681332203403145435568316851327593401208105741076214120093531"
    ],
    [
      "1",
      "0"
    ]
  ],
  "vk_delta_2": [
    [
      "10857046999023057135944570762232829481370756359578518086990519993285655852781",
      "11559732032986387107991004021392285783925812861821192530917403151452391805634"
    ],
    [
      "8495653923123431417604973247489272438418190587263600148770280649306958101930",
      "4082367875863433681332203403145435568316851327593401208105741076214120093531"
    ],
    [
      "1",
      "0"
    ]
  ],
  "vk_alphabeta_12": [
    [
      [
        "2029413683389138792403550203267699914886160938906632433982220835551125967885",
        "21072700047562757817161031222997517981543347628379360635925549008442030252106"
      ],
      [
        "5940354580057074848093997050200682056184807770593307860589430076672439820312",
        "12156638873931618554171829126792193045421052652279363021382169897324752428276"
      ],
      [
        "7898200236362823042373859371574133993780991612861777490112507062703164551277",
        "7074218545237549455313236346927434013100842096812539264420499035217050630853"
      ]
    ],
    [
      [
        "7077479683546002997211712695946002074877511277312570035766170199895071832130",
        "10093483419865920389913245021038182291233451549023025229112148274109565435465"
      ],
      [
        "4595479056700221319381530156280926371456704509942304414423590385166031118820",
        "19831328484489333784475432780421641293929726139240675179672856274388269393268"
      ],
      [
        "11934129596455521040620786944827826205713621633706285934057045369193958244500",
        "8037395052364110730298837004334506829870972346962140206007064471173334027475"
      ]
    ]
  ],
  "IC": [
    [
      "1451193133033985622675974395212898695894420218423981349444775983416323297705",
      "6447804039682332744983541066842759692406915920150656950370867868891728310125",
      "1"
    ],
    [
      "11710891714820527465038561149778207792450883245735479001691217845723259640042",
      "9278340768919842228225650593390957826554240217633951840330526915184860412442",
      "1"
    ],
    [
      "2276565553259163190059968305908537035580282621107837127696787732925205140758",
      "5854248444736422481238778145559068892557782193620954076591304540333867917233",
      "1"
    ],
    [
      "15325440749972027457976221217896409232242126978578260136697639117546451477263",
      "8895543644489386895843358575900390786134660498367587020999692625431814890661",
      "1"
    ],
    [
      "16314360857258389332146288890944508482087292067976256071708605732595417465218",
      "20315454001980794515629261699921049716477135139655962059958847952114915117486",
      "1"
    ]
  ]
}

const app = express();
app.use(express.json());



function generateSmsCode() {
  let t = Math.floor(100000 + Math.random() * 900000).toString()


  return t;
}

const findUserBySMS = async (SMS) => {
  const dataPath = path.join(__dirname, 'data', 'sms_data.json');
  let existingData = [];
  try {
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch { }

  const userIndex = existingData.findIndex(entry => entry.code === SMS);
  return !(userIndex == -1);
}

const selectUserBySMS = async (SMS) => {
  const dataPath = path.join(__dirname, 'data', 'sms_data.json');
  let existingData = [];
  try {
    const fileContent = await fs.readFile(dataPath, 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch { }

  const userIndex = existingData.findIndex(entry => entry.code === SMS);
  if (userIndex == -1) {
    return { status: false, code: null, msg: "Wrong SMS verification code." };
  } else {
    return { status: true, code: vKeyfor12345 };
  }
}

app.post('/send-sms', async (req, res) => {
  const { number } = req.body;
  if (!number) return res.status(400).send({ error: 'Missing number in request body' });

  const smsCode = generateSmsCode();
  const adbCommand = `adb emu sms send ${number} "Your verification code is: ${smsCode}"`;

  try {
    await exec(adbCommand);
    console.log('SMS sent.');

    const dataPath = path.join(__dirname, 'data', 'sms_data.json');
    let existingData = [];
    try {
      const fileContent = await fs.readFile(dataPath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch { }

    const userIndex = existingData.findIndex(entry => entry.user_phone === number);
    if (userIndex !== -1) {
      existingData[userIndex].code = smsCode;
    } else {
      existingData.push({ user_phone: number, code: smsCode, timestamp: new Date().toISOString() });
    }

    await fs.writeFile(dataPath, JSON.stringify(existingData, null, 2), 'utf-8');
    res.send({ success: true, message: 'SMS sent and data saved successfully!' });
  } catch (err) {
    console.error('Error sending SMS:', err);
    res.status(500).send({ error: 'Failed to send SMS' });
  }
});

app.post('/verify', async (req, res) => {
  const { proof, pubsig, SMS } = req.body;
  if (!findUserBySMS(SMS)) {
    res.status(400).send({ success: false, message: "Wrong phone number or sms code." });

  }


  sms_status = await selectUserBySMS(SMS)
  console.log("Received Proof:", proof)
  if (sms_status.status == false) {
    res.status(400).send({ success: false, error: sms_status.msg });
    return
  }
  else {
    vKey = sms_status.code
  }


  try {
    const isValid = await snarkjs.groth16.verify(vKey, pubsig, proof);

    if (isValid) {
      res.send({ success: true, message: 'ZKP verification successful!' });
    } else {
      res.status(400).send({ success: false, error: 'Invalid proof or public signals' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
