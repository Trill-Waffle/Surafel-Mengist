let robot = lib220.loadImageFromURL("https://people.cs.umass.edu/~joydeepb/robot.jpg");
let robotCopy = robot.copy();

function removeBlueAndGreen(image) {
    //create a copy
    let imageCopy = image.copy();
    //loop through copied image to remove blue and green
    for (let i = 0; i < imageCopy.width; ++i) {
        for (let j = 0; j < imageCopy.height; ++j) {
            imageCopy.setPixel(i, j, [imageCopy.getPixel(i, j)[0], 0, 0]);
        }
    }
    return imageCopy;
}

test("removeBlueAndGreen function definition is correct", function () {
    const white = lib220.createImage(10, 10, [1, 1, 1]);
    // Checks that code runs. Need to use assert to check properties.
    const processed = removeBlueAndGreen(white);
    assert(pixelEq(processed.getPixel(0, 0), [1, 0, 0]));
});
test("No blue or green in removeBlueAndGreen result", function () {
    // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
    const white = lib220.createImage(10, 10, [1, 1, 1]);
    // Get the result of the function.
    const shouldBeRed = removeBlueAndGreen(white);
    // Read the center pixel.
    const pixelValue = shouldBeRed.getPixel(5, 5);
    // The red channel should be unchanged.
    assert(pixelValue[0] === 1);
    // The green channel should be 0.
    assert(pixelValue[1] === 0);
    // The blue channel should be 0.
    assert(pixelValue[2] === 0);
});

function shiftRGB(image) {
    //create a copy of input
    let imageCopy = image.copy();
    //loop through image to shift rgb
    for (let i = 0; i < imageCopy.width; ++i) {
        for (let j = 0; j < imageCopy.height; ++j) {
            let red = imageCopy.getPixel(i, j)[0];
            let green = imageCopy.getPixel(i, j)[1];
            let blue = imageCopy.getPixel(i, j)[2];
            imageCopy.setPixel(i, j, [green, blue, red]);
        }
    }
    return imageCopy;
}
//takes in and image and a function of type pixel
//returns and image
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

function mapToRed(image) {
    //create copy of input image
    let imageCopy = image.copy();
    //removed all but red image from image
    imageCopy = imageMap(imageCopy, (x) => [x[0], 0, 0]);

    return imageCopy;
}

function mapToGBR(image) {
    //create copy of input image
    let imageCopy = image.copy();
    //shifts to GBR
    imageCopy = imageMap(imageCopy, (x) => [x[1], x[2], x[0]]);
    return imageCopy;
}

function increaseContrast(image) {
    //create copy of input image
    let imageCopy = image.copy();
    //uses helper method to calculate and change contrast of image
    imageCopy = imageMap(imageCopy, contrastHelper);
    return imageCopy;
}

function contrastHelper(pixel) {
    let contrasted = [];

    pixel.map((x) => (x < 0.5 ? contrasted.push(x - 0.1*(x-0)) : x > 0.5 ? contrasted.push(x + .1*(1 - x)) : contrasted.push(x)));
    return contrasted;
}

test("contrast function test", function () {
    const halfImage = lib220.createImage(10, 10, [0.3, 0.6, 0.8]);
    const processed = increaseContrast(halfImage);
    assert(pixelEq(processed.getPixel(0, 0), [0.27, 0.64, 0.82]));
  
});

increaseContrast(robotCopy);
mapToRed(robotCopy);
mapToGBR(robotCopy);

function pixelEq(p1, p2) {
    const epsilon = 0.002;
    for (let i = 0; i < 3; ++i) {
        if (Math.abs(p1[i] - p2[i]) > epsilon) {
            return false;
        }
    }
    return true;
}

test("Check pixel equality", function () {
    const inputPixel = [0.5, 0.5, 0.5];
    // Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel
    const image = lib220.createImage(10, 10, inputPixel);
    // Process the image.
    const outputImage = removeBlueAndGreen(image);
    // Check the center pixel.
    const centerPixel = outputImage.getPixel(5, 5);
    assert(pixelEq(centerPixel, [0.5, 0, 0]));
    // Check the top-left corner pixel.
    const cornerPixel = outputImage.getPixel(0, 0);
    assert(pixelEq(cornerPixel, [0.5, 0, 0]));
});
