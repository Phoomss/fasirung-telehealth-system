const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const password = 'password123';

const users = [
  {
    title: 'Admin',
    full_name: 'System Administrator',
    phone: '0000000000',
    age: 30,
    username: 'admin',
    role: 'ADMIN',
  },
  {
    title: 'Mr.',
    full_name: 'Somchai Wattanakul',
    phone: '0812345678',
    age: 42,
    username: 'somchai',
    role: 'USER',
  },
  {
    title: 'Ms.',
    full_name: 'Siriporn Kanya',
    phone: '0823456789',
    age: 35,
    username: 'siriporn',
    role: 'USER',
  },
  {
    title: 'Mrs.',
    full_name: 'Naree Chaiyo',
    phone: '0834567890',
    age: 51,
    username: 'naree',
    role: 'USER',
  },
  {
    title: 'Mr.',
    full_name: 'Anan Srisuk',
    phone: '0845678901',
    age: 28,
    username: 'anan',
    role: 'USER',
  },
  {
    title: 'Ms.',
    full_name: 'Kanda Meesri',
    phone: '0856789012',
    age: 31,
    username: 'officer.kanda',
    role: 'OFFICER',
  },
  {
    title: 'Mr.',
    full_name: 'Preecha Boonmee',
    phone: '0867890123',
    age: 39,
    username: 'officer.preecha',
    role: 'OFFICER',
  },
  {
    title: 'Dr.',
    full_name: 'Dr. Mali Ratanasri',
    phone: '0878901234',
    age: 45,
    username: 'dr.mali',
    role: 'COUNSELOR',
  },
  {
    title: 'Dr.',
    full_name: 'Dr. Krit Noppakul',
    phone: '0889012345',
    age: 48,
    username: 'dr.krit',
    role: 'COUNSELOR',
  },
];

const contents = [
  {
    content_name: 'Preparing for a Blood Test',
    content_detail:
      'Fast for 8-12 hours if instructed, drink water normally, and bring your current medication list to the appointment.',
  },
  {
    content_name: 'When to Request an Online Consultation',
    content_detail:
      'Use telehealth for follow-up care, minor symptoms, medication questions, and reviewing lab results. Seek emergency care for severe or sudden symptoms.',
  },
  {
    content_name: 'Daily Wellness Checklist',
    content_detail:
      'Track sleep, water intake, movement, stress level, and medication adherence to help clinicians understand your health trends.',
  },
  {
    content_name: 'Understanding Consultation Status',
    content_detail:
      'Accepting cases are being reviewed by clinical staff. Completed cases have finished consultation and can be reviewed in your history.',
  },
];

const questionnaire = [
  {
    ques_name: 'How would you rate your current energy level?',
    answers: ['High', 'Moderate', 'Low', 'Very low'],
  },
  {
    ques_name: 'Have you had a fever in the past 48 hours?',
    answers: ['No', 'Yes, mild', 'Yes, high fever'],
  },
  {
    ques_name: 'How often did you exercise this week?',
    answers: ['4 or more days', '1-3 days', 'Not this week'],
  },
  {
    ques_name: 'Are you currently taking prescribed medication?',
    answers: ['No', 'Yes, taken as prescribed', 'Yes, missed some doses'],
  },
  {
    ques_name: 'What is your primary reason for using the service today?',
    answers: ['Blood test booking', 'General consultation', 'Follow-up consultation', 'Health education'],
  },
];

const bookingFixtures = [
  {
    username: 'somchai',
    booking_type: 'bloodTest',
    booking_detail: 'Annual health screening with fasting blood sugar and lipid profile.',
    appointment: '2026-06-05T09:30:00.000Z',
  },
  {
    username: 'siriporn',
    booking_type: 'consult',
    booking_detail: 'Follow-up consultation for recurring headache and sleep quality.',
    appointment: '2026-06-06T14:00:00.000Z',
  },
  {
    username: 'naree',
    booking_type: 'bloodTest',
    booking_detail: 'HbA1c monitoring and kidney function blood test.',
    appointment: '2026-06-07T10:15:00.000Z',
  },
  {
    username: 'anan',
    booking_type: 'consult',
    booking_detail: 'General consultation for sore throat and fatigue.',
    appointment: '2026-06-08T11:00:00.000Z',
  },
  {
    username: 'somchai',
    booking_type: 'consult',
    booking_detail: 'Review blood test results and receive lifestyle recommendations.',
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
