const ImageHandler = require('./ImageHandler.js')

let inputPath = 'input/tucan.jpg';
let handler = new ImageHandler(inputPath)
/**
 * Ejemplo de construccion de una imagen
 */
function ejemplo() {

    let outputPath = 'output/ejemplo.jpg';
    let pixeles = [];
    let filas = 2;
    let columnas = 2;
    for (let i = 0; i < filas; i++) {
        let nuevaFila = [];
        console.log("Fila: " + i);
        for (let j = 0; j < columnas; j++) {
            console.log("Columna:" + j)
            let pixel = [0, 0, 0]; // R G B -> Red Green Blue -> Rojo Verde Azul
            if ((i + j) % 2 === 0) { // Si la suma de la fila y la columna es par....
                pixel = [255, 255, 255];
            }
            console.log("Vamos a añadir el pixel " + pixel + " a la fila " + i + " columna " + j)
            nuevaFila.push(pixel);
        }
        console.log(nuevaFila)
        pixeles.push(nuevaFila);
    }
    console.log(pixeles);
    handler.savePixels(tputPath, filas, columnas);
}

/**
 * Esta función debe transformar una imagen en escala de rojos.
 *
 * Una forma de conseguirlo es simplemente poner los canales G y B a 0 para cada pixel.
 */
async function redConverter() {
    let outputPath = 'output/tucan_red_test.jpg';
    await handler.getPixels()
    handler.savePixels("converter_red")
    handler.writeImage(outputPath)
}

/**
 * Esta función debe transformar una imagen en escala de verdes.
 * 
 * Una forma de conseguirlo es simplemente poner los canales R y B a 0 para cada pixel.
 */
async function greenConverter() {
    let outputPath = 'output/tucan_green_test.jpg';
    await handler.getPixels();
    handler.savePixels("converter_green" );
    handler.writeImage(outputPath)
}

/**
 * Esta función debe transformar una imagen en escala de azules.
 *
 * Una forma de conseguirlo es simplemente poner los canales R y G a 0 para cada pixel.
 */
async function blueConverter() {
    let outputPath = 'output/tucan_blue_test.jpg';
    await handler.getPixels();
    handler.savePixels("converter_blue" );
    handler.writeImage(outputPath)
}

/**
 * Esta función debe transformar una imagen a su equivalente en escala de grises.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * asignarle a cada canal de RGB esa media.
 *
 * Es decir, si un pixel tiene el valor [100, 120, 200], su media es 140 y por lo tanto
 * lo debemos transformar en el pixel [140, 140, 140].
 */
async function greyConverter() {
    let outputPath = 'output/tucan_grey_test.jpg';
    await handler.getPixels();
    handler.savePixels("converter_grey" );
    handler.writeImage(outputPath)
}

/**
 * Esta función debe transformar una imagen a su equivalente en Blanco y negro.
 *
 * Una forma de conseguirlo es calcular la media de los valores RGB de cada pixel y
 * si esta es menor que 128 transforamr el pixel en negro [0, 0, 0] o, en caso contrario,
 * transformar el pixel en blanco [255, 255, 255].
 */
async function blackAndWhiteConverter() {
    let outputPath = 'output/tucan_black_and_white_test.jpg';
    await handler.getPixels();
    handler.savePixels("converter_black_white");
    handler.writeImage(outputPath)
}

/**
 * Esta función debe reducir la imagen a la mitad.
 *
 * Una forma de conseguirlo es quitar los valores de las filas y columnas pares.
 */
async function scaleDown() {
    let outputPath = 'output/tucan_scale_down_test.jpg';
    await handler.getPixels();
    handler.savePixels( "converter_scale_down") 
    handler.writeImage(outputPath)
}

/**
 * Esta función debe reducir el brillo de la imagen según el parámetro qye recibe la función.
 *
 * Una forma de conseguirlo es dividir el valor de cada pixel por el parámetro dimFactor.
 */
async function dimBrightness(dimFactor) {
    let outputPath = 'output/tucan_dimed_test.jpg';
    handler.dimFactor = dimFactor
    await handler.getPixels();
    handler.savePixels( "converter_brightness") 
    handler.writeImage(outputPath)
}

/**
 * Esta función debe invertir el color de la imagen.
 *
 * Una forma de conseguirlo es asignar a cada valor RGB de cada píxel el valor 255 - valorRGB.
 *
 * Por ejemplo, si un pixel tiene valor [10, 20, 50] su nuevo valor sera [255 - 10, 255 - 20, 255 - 50] => [245, 235, 205]
 */

// [255,0,0]
async function invertColors() {
    let outputPath = 'output/tucan_inverse_test.jpg';
    await handler.getPixels();
    handler.savePixels("invert_colors");
    handler.writeImage(outputPath)
}

/**
 * merge - Junta dos imagenes con cierto factor de fusion
 *
 * Una forma de conseguirlo es recorrer los pixeles de ambas imagenes y construir una nueva imagen donde
 * cada pixel sera el resultado de multiplicar los canales rgb de la primera imagen por el factor 1 y los
 * canales rgb de la segunda imagen por el factor 2.
 * @param alphaFirst Parametro a aplicar sobre la primera imagen
 * @param alphaSecond Parametro a aplicar sobre la segunda imagen
 */
async function merge(alphaFirst, alphaSecond) {
    let catHandler = new ImageHandler('input/cat.jpg');
    catHandler.mergeFactor = alphaFirst
    let dogHandler = new ImageHandler('input/dog.jpg');
    dogHandler.mergeFactor = alphaSecond
    let outputPath = 'output/merged_test.jpg';
    await catHandler.getPixels();
    await  dogHandler.getPixels();
    catHandler.savePixels("merged_images",dogHandler);
    catHandler.writeImage(outputPath)

}


/**
 * Programa de prueba
 * NO DEBES MODIFICAR ESTAS LÍNEAS DE CÓDIGO
 *
 * Ejecuta el archivo actividad.js tal como se indica en el archivo Readme.md
 * En la carpeta output/ apareceran los resultados para cada uno de los casos
 *
 *     Ejecutar ejemplo: 0
 *     Conversor a rojos: 1
 *     Conversor a verdes: 2
 *     Conversor a azules: 3
 *     Conversor a grises: 4
 *     Conversor blanco y negro: 5
 *     Redimensionar: 6
 *     Reducir brillo: 7
 *     Negativo: 8
 *     Fusion de imagenes: 9
 */
// let optionN = 9;

// switch (optionN) {
//     case 1: redConverter()
//     case 2: greenConverter(); break;
//     case 3: blueConverter(); break;
//     case 4: greyConverter(); break;
//     case 5: blackAndWhiteConverter(); break;
//     case 6: scaleDown(); break;
//     case 7: dimBrightness(.2); break;
//     case 8: invertColors(); break;
//     case 9: merge(0.3, 0.7); break;
//     default: ejemplo();
// }

redConverter()
greenConverter()
blueConverter()
greyConverter()
blackAndWhiteConverter()
scaleDown()
dimBrightness(.2)
invertColors()
merge(0.3, 0.7)