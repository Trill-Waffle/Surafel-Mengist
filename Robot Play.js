//blurPixel(img: Image, x: number, y: number): Pixel
function blurPixel(img, x, y) {


    let imageCopy = img.copy();
    let neighbors = getNeighbor(img, x, y);
    let findAverage = (neibor, index) => (neibor.reduce((acc, e) => acc + e[index], 0)) / neibor.length;

    return [findAverage(neighbors, 0), findAverage(neighbors, 1), findAverage(neighbors, 2)];

}

function getNeighbor(imgg, x, y) {
    let img = imgg.copy();
    let pixelStorage = [];

    for (let i = (x - 1); i <= (x + 1); ++i) {
        if (i < 0 || i > img.width - 1) {
            continue;
        }
        for (let j = (y - 1); j <= (y + 1); ++j) {
            if (j < 0 || j > img.height - 1) {
                continue;
            }
            pixelStorage.push(img.getPixel(i, j));
        }
    }
    return pixelStorage;
}


test("getNeighbor test", function() {
    const gray = lib220.createImage(3, 4, [.6, .6, .6]);

    let test1 = getNeighbor(gray, 0, 0);
    assert(test1.length === 4);

    let test2 = getNeighbor(gray, 0, 1);
    assert(test2.length === 6);

    let test3 = getNeighbor(gray, 0, 2);
    assert(test3.length === 6);

    let test4 = getNeighbor(gray, 2, 0);
    assert(test4.length === 4);

    let test5 = getNeighbor(gray, 1, 1);
    assert(test5.length === 9);


});

test("blurPixel test", function() {
    const gray = lib220.createImage(3, 3, [.6, .5, .6]);

    let test1 = blurPixel(gray, 0, 0);
    assert(pixelEq(test1, [.6, .5, .6]));

    gray.setPixel(0, 0, [1, 1, 1]);
    let test2 = blurPixel(gray, 0, 0);
    assert(pixelEq(test2, [.7, .625, .7]));

    let test3 = blurPixel(gray, 1, 1);
    assert(pixelEq(test3, [.644, .557, .644]));

});

function imageMapXY(img, func) {
    let imageCopy = img.copy();
    for (let x = 0; x < imageCopy.width; ++x) {
        for (let y = 0; y < imageCopy.height; ++y) {
            imageCopy.setPixel(x, y, func(imageCopy, x, y));
        }
    }
    return imageCopy;

}

//blurImage(img: Image): Image
function blurImage(img) {
    let imageCopy = img.copy();

    let bluredImage = imageMapXY(imageCopy, blurPixel);

    return bluredImage;

}

test("blurImage Test ", function() {

    const robot = lib220.createImage(10, 10, [.6, .6, .6]);
    robot.setPixel(0, 0, [.9, .9, .9]);
    robot.setPixel(0, 1, [.9, .9, .9]);
    const blur = blurImage(robot);
    assert(pixelEq(blur.getPixel(0, 0), [.752, .752, .752]));
    assert(pixelEq(blur.getPixel(4, 4), [.6, .6, .6]));

});

//diffLeft(img: Image, x: number, y: number): Pixel

function diffLeft(img, x, y) {
    if (x === 0) {
        return [0, 0, 0];
    }
    let pixel = img.getPixel(x, y);
    let leftPixel = img.getPixel(x - 1, y);

    let pixelIntensity = pixel.reduce((acc, e) => acc + e, 0) / 3;
    let leftPixelIntesity = leftPixel.reduce((acc, e) => acc + e, 0) / 3;
    let difference = Math.abs(leftPixelIntesity - pixelIntensity);

    return [difference, difference, difference];

}

test("diffLeft Test ", function() {

    const robot = lib220.createImage(5, 5, [.2, .3, .4]);
    //test no left
    assert(pixelEq(diffLeft(robot, 0, 1), [0, 0, 0]));
    //test same pixel value
    assert(pixelEq(diffLeft(robot, 1, 1), [0, 0, 0]));

    //test difference
    robot.setPixel(0, 0, [1, 1, 1]);
    assert(pixelEq(diffLeft(robot, 1, 0), [.7, .7, .7]));

    //test negative difference
    robot.setPixel(0, 0, [.2, .3, .4]);
    robot.setPixel(1, 0, [.8, .9, 1]);
    assert(pixelEq(diffLeft(robot, 1, 0), [.6, .6, .6]));

});

// highlightEdges(img: Image): Image

function highlightEdges(img) {
    let imageCopy = img.copy();
    imageCopy = imageMapXY(imageCopy, diffLeft);

    return imageCopy;

}

test("highlightEdge Test ", function() {
    let robot = lib220.loadImageFromURL("https://people.cs.umass.edu/~joydeepb/robot.jpg");
    robot = highlightEdges(robot);
    assert(pixelEq(robot.getPixel(0, 0), [0, 0, 0]));

});

//reduceFunctions(fa: ((p: Pixel) => Pixel)[] ): ((x: Pixel) => Pixel)
//takes in array of functions
//functions make in a pixel and return a pixel
//returns a function that takes in a pixel and reutrn a pixel

function reduceFunctions(fa) {

    return (x) => fa.reduce((acc, e) => e(acc), x);

}

test("Test ReduceFunctions", function() {

    let funArr = [x => x + 1, x => x * 2, x => x - 1];

    let compArr = reduceFunctions(funArr);

    assert(compArr(0) === 1);
    assert(compArr(5) === 11);

});

//combineThree(img: Image): Image

function combineThree(img) {
    let imageCopy = img.copy();
    let arrFunc = [makeGrayish, blackenLow, shiftRGB];

    let comB = reduceFunctions(arrFunc);

    let newImage = imageMap(imageCopy, comB);

    return newImage;

}


function imageMap(img, func) {
    //create copy of image
    let imageCopy = img.copy();
    //loop through image and perform an input function
    for (let i = 0; i < imageCopy.width; ++i) {
        for (let j = 0; j < imageCopy.height; ++j) {
            imageCopy.setPixel(i, j, func(imageCopy.getPixel(i, j)));
        }
    }
    return imageCopy;
}

function makeGrayish(pixel) {
    function isGrayish(p) {
        let max = p.reduce(function(x, y) {
            return Math.max(x, y)
        }, 0);
        let min = p.reduce(function(x, y) {
            return Math.min(x, y)
        }, p[0]);

        return (max - min) <= (1 / 3);

    }
    let averagePixel = (x) => [((x[0] + x[1] + x[2]) / 3), ((x[0] + x[1] + x[2]) / 3), ((x[0] + x[1] + x[2]) / 3)];

    let grayPix = isGrayish(pixel) ? pixel : averagePixel(pixel);

    return grayPix;

}

function blackenLow(pixel) {

    let blacken = pixel.map(x => (x < 1 / 3) ? 0 : x);
    return blacken;

}

function shiftRGB(pixel) {
    //create a copy of input
    //let imageCopy = image.copy();
    //loop through image to shift rgb
    let red = pixel[0];
    let green = pixel[1];
    let blue = pixel[2];
      
    return [green, blue, red];
}




function pixelEq(p1, p2) {
    const epsilon = 0.002; // increase for repeated storing & rounding
    return [0, 1, 2].every(i => Math.abs(p1[i] - p2[i]) <= epsilon);
};