const getPixalesNpm = require('get-pixels')
const savePixelesNpm = require('save-pixels')
const fs = require('fs')
const ndarray = require('ndarray')
class ImageHandler {

    /**
     * ImageHandler tiene 3 atributos internos.
     * 
     * path: Path de la imagen cuyos pixeles se quieren leer.
     * pixels: Array de arrays (Matriz) que representa cada uno de los pixeles de la imagen. Inicialmente vacío.
     * shape: Array con las dimensiones de la imagen (ancho, alto, profundidad (0)). Inicialmente [0,0,0]
     * @param {*} path Path de la imagen a leer.
     */
    constructor(path) {
        this.path = path;
        this.pixels = [];
        this.shape = [0, 0, 0];
        this.dimFactor = 0;
        this.mergeFactor = 0;
    }

    /**
     * getPixels
     * Function to set the pixels from an image
     */
    async getPixels() {
        try {
            const pixels = await new Promise((resolve, reject) => {
                getPixalesNpm(this.path, (err, pixles) => {
                    if (err)
                        reject(err)
                    else
                        resolve(pixles)
                })
            })
            this.pixels = pixels
        } catch (error) {
            console.log("Hubo un error " + error)
        }
    }


    /**
     * getShape
     * @returns Array de dimensiones de la imagen
     */
    getShape() {
        return this.pixels.shape

    }
    /**
    * @param {ImageHandler} image1 The first image to valid if equals
    * @param {ImageHandler} image2 The second image to valid if equals
    */
    areSameDimensions(image1, image2) {
        return image1.shape[0] === image2.shape[0] && image1.shape[1] === image2.shape[1];
    }

    /**
    * @param {ImageHandler} anotherImage The date
    */
    fusionImages(anotherImage) {
        if (!this.areSameDimensions(this.pixels, anotherImage.pixels)) {
            console.error('Las imágenes deben tener las mismas dimensiones.');
            return;
        }
        

        for (let i = 0; i < this.pixels.data.length; i++) {
            this.pixels.data[i] = Math.round(this.pixels.data[i] * (1 - this.mergeFactor) + anotherImage.pixels.data[i] * this.mergeFactor);
        }
    }

    /**
    * @param {string} type Type of conversion to be performed
    * 
    */
    converterType(type) {
        for (let i = 0; i < this.pixels.data.length; i += 4) {
            const avg = (this.pixels.data[i] + this.pixels.data[i + 1] + this.pixels.data[i + 2]) / 3;
            switch (type) {
                case "red":
                    this.pixels.data[i + 1] = 0
                    this.pixels.data[i + 2] = 0
                    break;
                case "green":
                    this.pixels.data[i] = 0
                    this.pixels.data[i + 2] = 0
                    break;
                case "blue":
                    this.pixels.data[i] = 0
                    this.pixels.data[i + 1] = 0
                    break;
                case "grey":

                    this.pixels.data[i] = avg;
                    this.pixels.data[i + 1] = avg;
                    this.pixels.data[i + 2] = avg;
                    this.pixels.data[i + 3] = 1;
                    break;
                case "blackAndWhite":
                    if (avg <= 128) {
                        this.pixels.data[i] = 0;
                        this.pixels.data[i + 1] = 0;
                        this.pixels.data[i + 2] = 0;
                    } else {
                        this.pixels.data[i] = 255;
                        this.pixels.data[i + 1] = 255;
                        this.pixels.data[i + 2] = 255;
                    }
                    break;
                case "brightness":
                    this.pixels.data[i] *= this.dimFactor;
                    this.pixels.data[i + 1] *= this.dimFactor;
                    this.pixels.data[i + 2] *= this.dimFactor;
                    break;
                case "inverted":
                    this.pixels.data[i] = 255 - this.pixels.data[i];
                    this.pixels.data[i + 1] = 255 - this.pixels.data[i + 1];
                    this.pixels.data[i + 2] = 255 - this.pixels.data[i + 2];
                    break;
                default:
                    break;
            }
        }
    }

    /**
    * @param {string} typeConverter Type of conversion to be performed 
    * @param {ImageHandler} anotherImage The other image to fusion, maybe null
    * 
    */
    converterImage(typeConverter, anotherImage = null) {
        switch (typeConverter) {
            case "converter_red":
                this.converterType("red")
                break;
            case "converter_green":
                this.converterType("green")
                break;
            case "converter_blue":
                this.converterType("blue")
                break;
            case "converter_grey":
                this.converterType("grey")
                break;
            case "converter_black_white":
                this.converterType("blackAndWhite")
                break;
            case "converter_scale_down":
                this.pixels.shape[0] = this.pixels.shape[0] / 2
                this.pixels.shape[1] = this.pixels.shape[1] / 2
                break;
            case "converter_brightness":
                this.converterType("brightness")
                break;
            case "invert_colors":
                this.converterType("inverted")
                break;
            case "merged_images":
                this.fusionImages(anotherImage);
            default:
                break
        }
        // console.log(JSON.stringify(this.pixels.data))
    }

    /**
     * Dado un array de pixels, guarda dichos pixeles en la imagen gestionada por el handler.
     * @param {*} typeConverter - Typo de imagen a convertir
   
     */
    savePixels(typeConverter, anotherImage = null) {
        this.converterImage(typeConverter, anotherImage)
       
    }

     /**
     * Funtion to write image to path result
     */
    writeImage(outputPath){
        const newImageStream = fs.createWriteStream(outputPath);
        savePixelesNpm(this.pixels, 'jpg').pipe(newImageStream);

        newImageStream.on('finish', () => {
            console.log('Imagen guardada correctamente en', outputPath);
        });
    }


}

module.exports = ImageHandler
