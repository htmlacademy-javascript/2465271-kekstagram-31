//  Создаем константы с переменными и массивами необходимых данных
const AUTORS = ['Артем', 'Андрей', 'Сергей', 'Владимир', 'Дмитрий', 'Василий', 'Александр', 'Вячеслав', 'Антон', 'Евгений', 'Михаил', 'Денис', 'Мария', 'Татьяна', 'Елена', 'Анастасия', 'Виктория', 'Екатерина', 'Светлана', 'Юлия', 'Юрий', 'Валерия', 'Станислав', 'Ольга', 'Любовь'];
const DESCRIPTIONS = ['Красота!', 'Бывает же такое!', 'Классное фото!', 'Обожаю!', 'Без комментариев', 'Лучше промолчать!', 'Комментарии здесь излишни!', 'Очень интересная фотография!'];
const COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// Создаем функцию возвращающую рандомное число
const getRandomData = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
// Создаем функцию возвращающую не повторяющиеся случайные значения ключей объектов
function createNoRepeatData (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomData(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomData(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}
// Создаем функциювозвращающую случайный эемент массива
const getRandomArrayElement = (elements) => elements[getRandomData(0, elements.length - 1)];
// Создаем функцию возвращающую результат
const getResultObject = (objectCount, commentCount) => {
  const generateDescriptionID = createNoRepeatData(1, objectCount);
  const generateDescriptionURL = createNoRepeatData(1, objectCount);
  const generateCommentID = createNoRepeatData(1, objectCount * commentCount);

  const createCommentsDescription = () => ({
    id: generateCommentID(),
    avatar: `img/avatar-${getRandomData(1, 6)}`,
    message: `${getRandomArrayElement(COMMENT_MESSAGES)}`,
    name: `${getRandomArrayElement(AUTORS)}`
  });

  const createPhotoDescription = () => ({
    id: generateDescriptionID(),
    url: `photos/${generateDescriptionURL()}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTIONS)}`,
    likes: getRandomData(15,200),
    comments: Array.from({length: getRandomData(0, commentCount)}, createCommentsDescription)
  });
  return Array.from({length: objectCount}, createPhotoDescription);
};
getResultObject(25,30);