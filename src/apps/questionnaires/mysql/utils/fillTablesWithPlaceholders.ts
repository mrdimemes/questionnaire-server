import { TagService, QuestionnaireService } from "../../controller/services";

export const fillTablesWithPlaceholders = async () => {
  await placeTagPlaceholders();
  await placeQuestionnairePlaceholders();
}

const placeTagPlaceholders = async () => {
  const tagLabels = ["Политика", "Кино", "Спорт", "Видеоигры", "Экология", "Психология", "Наука", "Досуг", "Безопасность", "Программирование", "Кулинария", "Работа", "Привычки", "IT", "Бухгалтерия", "Культура", "Любовь", "Садоводство", "Электроника", "Животные", "Промышленность", "Трудоустройство", "Химия", "Дизайн"];
  for (const tagLabel of tagLabels) {
    TagService.addTag(tagLabel);
  }
}

const placeQuestionnairePlaceholders = async () => {
  const lorem120 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo sequi recusandae, magnam eum similique debitis nisi dolorum natus inventore accusamus? At animi minus provident minima. Hic et consectetur magnam recusandae nostrum quod quis corrupti! Quod est numquam, laborum eum rerum reprehenderit commodi repellendus neque, ab, voluptates ipsum beatae corporis enim! Quibusdam dicta officia ab vel vero rem autem, nihil iusto earum corrupti a molestias in molestiae consequatur culpa, recusandae aliquid quod facere ipsa nulla consectetur? Cumque nobis laudantium repudiandae natus, dolorum sed similique quo, quis ut in quas deserunt assumenda impedit asperiores. Ab fugiat nobis qui ea sunt, exercitationem dolores quibusdam nam commodi minus perferendis nisi tempore consectetur laudantium sed numquam aspernatur odit fugit tempora, debitis ipsam, quod illum totam."
  const lorem30 = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime error ratione laborum sed nulla velit et. Ducimus eligendi ut a aliquid perspiciatis tempore amet reprehenderit maxime, quibusdam nulla cumque recusandae."
  const labels = ["Первый опросник", "Второй опросник", "Третий опросник", "Опросник номер четыре", "Номер пять", "Важная анкета!", "Пройдите опрос", "Бла-бла-бла", "Название анкеты", "Очередной опросник", "Опросник мечты", "Отношение к важным событиям", "Пятница тринадцатое (опрос №13)", "Даб-даб-даб", "Анкета №15", "Анкета №16", "Ещё один опросник", "Пройдите опрос, пожалуйста", "Опрос о *рандомная тема*", "Аж двадцатая анкета", "Ад на Земле", "Ад под Землей", "Ад над Землей", "Просто опросник", "Просто анкета", "Почти последняя анккета", "Ещё немного", "English questionnaire label", "Предпоследний опросник", "Последний опросник"]
  for (const label of labels) {
    await QuestionnaireService.addQuestionnaire(
      label,
      lorem120,
      [
        {
          questionType: "CHECKBOX",
          text: lorem30,
          isRequired: false,
          fields: ["Первый вариант", "Второй вариант", "Третий Вариант"]
        },
        {
          questionType: "RADIO",
          text: lorem30,
          isRequired: true,
          fields: ["Первый вариант", "Второй вариант", "Третий Вариант"]
        },
        {
          questionType: "TEXT",
          text: lorem30,
          isRequired: true,
          fields: ["Текст"]
        }
      ],
      [1, 2, 3]
    );
  }
}