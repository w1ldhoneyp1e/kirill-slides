 
import { changePresentationName, addSlide, deleteSlide, changeSlidePosition, addText,
    addPicture, setTextValue, setTextFontSize, setTextFamily, setTextColor, setSlideBackground, setObjectPosition, setObjectSize } from './methods.js';
import { SolidBackground, ImageBackground, Size, TextObj, PictureObj, Presentation, Slide } from './types.js';

const solidBack: SolidBackground = {
    hexColor: 'purple',
    type: 'solid'
};
const imageBack: ImageBackground = {
    src: '/home/pics/mom.jpg',
    type: 'image'
};
const background1 = solidBack;
const background2 = imageBack;
const size1: Size = {
    width: 50,
    height: 100
};
let textObj1: TextObj = {
    id: 'textObj1',
    position: {
        x: 1,
        y: 1
    },
    size: size1,
    text: 'hello',
    fontSize: 12,
    family: 'Roboto',
    hexColor: 'black'
};
const textObj2: TextObj = {
    id: 'textObj2',
    position: {
        x: 100,
        y: 100
    },
    size: size1,
    text: 'bye',
    fontSize: 14,
    family: 'Times New Roman',
    hexColor: 'green'
};
let pictureObj1: PictureObj = {
    id: 'pictureObj1',
    position: {
        x: 1,
        y: 1
    },
    size: size1,
    src: '/home/pics/tree.jpg'
};
const pictureObj2: PictureObj = {
    id: 'pictureObj2',
    position: {
        x: 1,
        y: 1
    },
    size: size1,
    src: '/home/pics/mountain.jpg'
};
let minSlide1: Slide = {
    id: 'minSlide1',
    contentObjects: [],
    background: background1
};

let maxSlide1: Slide = {
    id: 'maxSlide1',
    contentObjects: [textObj1, textObj2],
    background: background1
};
let maxSlide2: Slide = {
    id: 'maxSlide2',
    contentObjects: [pictureObj1, pictureObj2],
    background: background2
};
let minPres: Presentation = {
    id: 'minPres',
    name: 'test presentation',
    slides: []
};
let maxPres: Presentation = {
    id: 'maxPres',
    name: 'test presentation',
    slides: [maxSlide1, maxSlide2]
};


function changePresentationNameTest() {
    console.log('Тестируем changePresentationName');
    console.log('Name before: ', minPres.name);
    minPres = changePresentationName(minPres, 'New minPres name');
    console.log('Name after: ', minPres.name);
    console.log('\n');

    console.log('Name before: ', maxPres.name);
    maxPres = changePresentationName(maxPres, 'New maxPres name');
    console.log('Name after: ', maxPres.name);
    console.log('\n');
}

function addSlideTest() {
    console.log('Тестируем addSlide');
    console.log('Slides before: ', minPres.slides);
    minPres.slides = addSlide(minPres.slides);
    console.log('Slides after: ', minPres.slides);
    console.log('\n');

    console.log('Slides before: ', maxPres.slides);
    maxPres.slides = addSlide(maxPres.slides);
    console.log('Slides after: ', maxPres.slides);
    console.log('\n');
}

function deleteSlideTest() {
    console.log('Тестируем deleteSlide');
    console.log('Slides before: ', minPres.slides);
    minPres.slides = deleteSlide(minPres.slides, minPres.slides[0].id);
    console.log('Slides after: ', minPres.slides);
    console.log('\n');

    console.log('Slides before: ', maxPres.slides);
    maxPres.slides = deleteSlide(maxPres.slides, maxPres.slides[0].id);
    console.log('Slides after: ', maxPres.slides);
    console.log('\n');
}

function changeSlidePositionTest() {
    console.log('Тестируем changeSlidePosition');
    minPres.slides = addSlide(minPres.slides);
    minPres.slides = addSlide(minPres.slides);
    console.log('Перемещаем второй слайд на первую позицию. Slides before: ', minPres.slides);
    minPres.slides = changeSlidePosition(minPres.slides, (minPres.slides[1]).id, 0);
    console.log('Slides after: ', minPres.slides);
    console.log('\n');

    maxPres.slides = addSlide(maxPres.slides);
    maxPres.slides = addSlide(maxPres.slides);
    console.log('Перемещаем первый слайд на вторую позицию. Slides before: ', maxPres.slides);
    maxPres.slides = changeSlidePosition(maxPres.slides, (maxPres.slides[0]).id, 1);
    console.log('Slides after: ', maxPres.slides);
    console.log('\n');
}

function addTextTest() {
    console.log('Тестируем addText');
    console.log('Content objects before: ', minSlide1.contentObjects);
    minSlide1 = addText(minSlide1);
    console.log('Content objects after: ', minSlide1.contentObjects);
    console.log('\n');

    console.log('Content objects before: ', maxSlide1.contentObjects);
    maxSlide1 = addText(maxSlide1);
    console.log('Content objects after: ', maxSlide1.contentObjects);
    console.log('\n');
}



function addPictureTest() {
    console.log('Тестируем addPicture');
    minSlide1.contentObjects = [];
    console.log('Content objects before: ', minSlide1.contentObjects);
    minSlide1 = addPicture(minSlide1, '/home/pics/my_photo.png');
    console.log('Content objects after: ', minSlide1.contentObjects);
    console.log('\n');

    console.log('\n');
    console.log('Content objects before: ', maxSlide1.contentObjects);
    maxSlide1 = addPicture(maxSlide1, '/home/pics/dog.png');
    console.log('Content objects after: ', maxSlide1.contentObjects);
    console.log('\n');
}

function setObjectPositionTest() {
    console.log('Тестируем setTextPosition');
    console.log('Text position before: ', textObj1.position);
    textObj1 = setObjectPosition(textObj1, {x: 20, y: 30});
    console.log('Text position after: ', textObj1.position);
    console.log('\n');

    console.log('Тестируем setPicturePosition');
    console.log('Text position before: ', pictureObj1.position);
    pictureObj1 = setObjectPosition(pictureObj1, {x: 70, y: 80});
    console.log('Text position after: ', pictureObj1.position);
    console.log('\n');
}




const size3: Size = {
    width: 100,
    height: 100
};
function setObjectSizeTest() {
    console.log('Тестируем setTextSize');
    console.log('Text size before: ', textObj1.size);
    textObj1 = setObjectSize(textObj1, size3);
    console.log('Text size after: ', textObj1.size);
    console.log('\n');

    console.log('Тестируем setPictureSize');
    console.log('Picture size before: ', pictureObj1.size);
    pictureObj1 = setObjectSize(pictureObj1, size3);
    console.log('Picture size after: ', pictureObj1.size);
    console.log('\n');
}

function setTextValueTest() {
    console.log('Тестируем setTextValue');
    console.log('Text value before: ', textObj1.text);
    textObj1 = setTextValue(textObj1, 'lalala');
    console.log('Text value after: ', textObj1.text);
    console.log('\n');
}

function setTextFontSizeTest() {
    console.log('Тестируем setTextFontSize');
    console.log('Text font size before: ', textObj1.fontSize);
    textObj1 = setTextFontSize(textObj1, 20);
    console.log('Text font size after: ', textObj1.fontSize);
    console.log('\n');
}

function setTextFamilyTest() {
    console.log('Тестируем setTextFamily');
    console.log('text font family before: ', textObj1.family);
    textObj1 = setTextFamily(textObj1, 'Montserat');
    console.log('text font family after: ', textObj1.family);
    console.log('\n');
}

function setTextColorTest() {
    console.log('Тестируем setTextColor');
    console.log('text font color before: ', textObj1.hexColor);
    textObj1 = setTextColor(textObj1, 'brown');
    console.log('text font color after: ', textObj1.hexColor);
    console.log('\n');
}

function setSlideBackgroundTest() {
    console.log('Тестируем setSlideBackground');
    console.log('Slide background before', minSlide1.background);
    minSlide1 = setSlideBackground(minSlide1, background2);
    console.log('Slide background after', minSlide1.background);
    console.log('\n');

    console.log('Slide background before', maxSlide2.background);
    maxSlide2 = setSlideBackground(maxSlide2, background1);
    console.log('Slide background after', maxSlide2.background);
    console.log('\n');
}

function testInit() {
    changePresentationNameTest();
    addSlideTest();
    deleteSlideTest();
    changeSlidePositionTest();
    addTextTest();
    addPictureTest();
    setObjectPositionTest();
    setObjectSizeTest();
    setTextValueTest();
    setTextFontSizeTest();
    setTextFamilyTest();
    setTextColorTest();
    setSlideBackgroundTest();
}

export {
    testInit
};

