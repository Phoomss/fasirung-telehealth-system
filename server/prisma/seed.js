const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const password = 'password123';

const users = [
  {
    title: 'ผู้ดูแล',
    full_name: 'ผู้ดูแลระบบสูงสุด',
    phone: '0000000000',
    age: 30,
    username: 'admin',
    role: 'ADMIN',
  },
  {
    title: 'นาย',
    full_name: 'สมชาย วัฒนกุล',
    phone: '0812345678',
    age: 42,
    username: 'somchai',
    role: 'USER',
  },
  {
    title: 'นางสาว',
    full_name: 'ศิริพร กันยา',
    phone: '0823456789',
    age: 35,
    username: 'siriporn',
    role: 'USER',
  },
  {
    title: 'นาง',
    full_name: 'นารี ไชโย',
    phone: '0834567890',
    age: 51,
    username: 'naree',
    role: 'USER',
  },
  {
    title: 'นาย',
    full_name: 'อนันต์ ศรีสุข',
    phone: '0845678901',
    age: 28,
    username: 'anan',
    role: 'USER',
  },
  {
    title: 'นางสาว',
    full_name: 'กานดา มีศรี',
    phone: '0856789012',
    age: 31,
    username: 'officer.kanda',
    role: 'OFFICER',
  },
  {
    title: 'นาย',
    full_name: 'ปรีชา บุญมี',
    phone: '0867890123',
    age: 39,
    username: 'officer.preecha',
    role: 'OFFICER',
  },
  {
    title: 'พญ.',
    full_name: 'พญ. มะลิ รัตนศรี',
    phone: '0878901234',
    age: 45,
    username: 'dr.mali',
    role: 'COUNSELOR',
  },
  {
    title: 'นพ.',
    full_name: 'นพ. กฤษณ์ นพกุล',
    phone: '0889012345',
    age: 48,
    username: 'dr.krit',
    role: 'COUNSELOR',
  },
];

const contents = [
  {
    content_name: 'การเตรียมตัวสำหรับการเจาะเลือด',
    content_detail:
      'งดน้ำและอาหาร 8-12 ชั่วโมงตามคำแนะนำของแพทย์ (สามารถดื่มน้ำเปล่าได้ตามปกติ) และนำรายการยาที่ทานอยู่มาแสดงในวันนัดหมายด้วย',
  },
  {
    content_name: 'เมื่อไหร่ควรขอรับบริการปรึกษาออนไลน์',
    content_detail:
      'ใช้บริการพบแพทย์ออนไลน์สำหรับการติดตามอาการ อาการเจ็บป่วยทั่วไปเล็กน้อย สอบถามเรื่องการใช้ยา หรือฟังการรายงานวิเคราะห์ผลแล็บ',
  },
  {
    content_name: 'รายการตรวจสอบสุขภาพประจำวัน',
    content_detail:
      'บันทึกพฤติกรรมการนอนหลับ ปริมาณการดื่มน้ำ การขยับออกกำลังกาย ระดับความเครียด และการทานยา เพื่อช่วยให้แพทย์ประเมินแนวโน้มสุขภาพได้แม่นยำขึ้น',
  },
  {
    content_name: 'ทำความเข้าใจสถานะการปรึกษาคิว',
    content_detail:
      'เคสที่รับการรักษาอยู่กำลังได้รับการตรวจสอบโดยพยาบาลหรือเจ้าหน้าที่ ส่วนเคสที่เสร็จสิ้นสามารถเปิดดูประวัติและคำแนะนำของแพทย์ย้อนหลังได้',
  },
];

const questionnaire = [
  {
    ques_name: 'คุณรู้สึกว่าระดับพลังงานในร่างกายของคุณตอนนี้เป็นอย่างไร?',
    answers: ['ปกติ/กระปรี้กระเปร่า', 'ปานกลาง', 'เหนื่อยง่าย', 'อ่อนเพลียมาก'],
  },
  {
    ques_name: 'คุณมีอาการไข้ในช่วง 48 ชั่วโมงที่ผ่านมาหรือไม่?',
    answers: ['ไม่มีไข้', 'มีไข้ต่ำๆ', 'มีไข้สูง'],
  },
  {
    ques_name: 'สัปดาห์นี้คุณได้ออกกำลังกายบ่อยแค่ไหน?',
    answers: ['4 วันขึ้นไป', '1-3 วัน', 'ไม่ได้ออกกำลังกายเลย'],
  },
  {
    ques_name: 'คุณกำลังรับประทานยาตามแพทย์สั่งอย่างต่อเนื่องหรือไม่?',
    answers: ['ไม่ได้ทานยา', 'ทานครบตามแพทย์สั่ง', 'ลืมทานบ้างบางมื้อ'],
  },
  {
    ques_name: 'จุดประสงค์หลักในการขอรับบริการของคุณวันนี้คืออะไร?',
    answers: ['จองคิวตรวจเลือด', 'ปรึกษาปัญหาสุขภาพทั่วไป', 'ติดตามผลการรักษา', 'รับคำแนะนำด้านสุขภาพ'],
  },
];

const bookingFixtures = [
  {
    username: 'somchai',
    booking_type: 'bloodTest',
    booking_detail: 'ตรวจสุขภาพประจำปี ตรวจระดับน้ำตาลและไขมันในเลือด (งดอาหารล่วงหน้า)',
    appointment: '2026-06-05T09:30:00.000Z',
  },
  {
    username: 'siriporn',
    booking_type: 'consult',
    booking_detail: 'ติดตามผลการรักษาและปรึกษาอาการปวดศีรษะเรื้อรัง รวมถึงคุณภาพการนอนหลับ',
    appointment: '2026-06-06T14:00:00.000Z',
  },
  {
    username: 'naree',
    booking_type: 'bloodTest',
    booking_detail: 'ติดตามผลระดับน้ำตาลสะสม (HbA1c) และตรวจการทำงานของไต',
    appointment: '2026-06-07T10:15:00.000Z',
  },
  {
    username: 'anan',
    booking_type: 'consult',
    booking_detail: 'ปรึกษาปัญหาสุขภาพทั่วไปเนื่องจากมีอาการเจ็บคอและอ่อนเพลีย',
    appointment: '2026-06-08T11:00:00.000Z',
  },
  {
    username: 'somchai',
    booking_type: 'consult',
    booking_detail: 'พบแพทย์เพื่อฟังผลตรวจเลือดและขอรับคำแนะนำในการปรับเปลี่ยนพฤติกรรม',
    appointment: '2026-06-12T15:30:00.000Z',
  },
];

const caseFixtures = [
  {
    bookingIndex: 0,
    officerUsername: 'officer.kanda',
    physicianUsername: 'dr.mali',
    case_status: 'accepting',
  },
  {
    bookingIndex: 1,
    officerUsername: 'officer.preecha',
    physicianUsername: 'dr.krit',
    case_status: 'completed',
  },
  {
    bookingIndex: 2,
    officerUsername: 'officer.kanda',
    physicianUsername: 'dr.krit',
    case_status: 'accepting',
  },
  {
    bookingIndex: 3,
    officerUsername: 'officer.preecha',
    physicianUsername: 'dr.mali',
    case_status: 'completed',
  },
];

async function resetDatabase() {
  await prisma.response.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.case.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  const hashedPassword = await bcrypt.hash(password, 10);

  await resetDatabase();

  await prisma.user.createMany({
    data: users.map((user) => ({
      ...user,
      password: hashedPassword,
    })),
  });

  await prisma.content.createMany({ data: contents });

  const createdUsers = await prisma.user.findMany();
  const usersByUsername = Object.fromEntries(
    createdUsers.map((user) => [user.username, user])
  );

  const createdQuestions = [];
  const createdAnswersByQuestion = new Map();

  for (const item of questionnaire) {
    const question = await prisma.question.create({
      data: { ques_name: item.ques_name },
    });

    const answers = await prisma.$transaction(
      item.answers.map((answer_text) =>
        prisma.answer.create({
          data: {
            questionId: question.id,
            answer_text,
          },
        })
      )
    );

    createdQuestions.push(question);
    createdAnswersByQuestion.set(question.id, answers);
  }

  const createdBookings = [];
  for (const fixture of bookingFixtures) {
    const booking = await prisma.booking.create({
      data: {
        userId: usersByUsername[fixture.username].id,
        booking_type: fixture.booking_type,
        booking_detail: fixture.booking_detail,
        appointment: new Date(fixture.appointment),
      },
    });
    createdBookings.push(booking);
  }

  await prisma.case.createMany({
    data: caseFixtures.map((fixture) => ({
      bookingId: createdBookings[fixture.bookingIndex].id,
      officerId: usersByUsername[fixture.officerUsername].id,
      physicianId: usersByUsername[fixture.physicianUsername].id,
      case_status: fixture.case_status,
    })),
  });

  const responseUsers = ['somchai', 'siriporn', 'naree', 'anan'];
  const responseData = responseUsers.flatMap((username, userIndex) =>
    createdQuestions.map((question, questionIndex) => {
      const answers = createdAnswersByQuestion.get(question.id);
      const answer = answers[(userIndex + questionIndex) % answers.length];

      return {
        userId: usersByUsername[username].id,
        questionId: question.id,
        answerId: answer.id,
      };
    })
  );

  await prisma.response.createMany({ data: responseData });

  console.log('Mock data seeded successfully.');
  console.log(`Users: ${users.length}, bookings: ${bookingFixtures.length}, cases: ${caseFixtures.length}`);
  console.log(`Login password for all mock accounts: ${password}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
