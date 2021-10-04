input.onButtonPressed(Button.A, function () {
    // Envía el valor de la temperatura
    radio.sendValue("T:", temp)
    // Envía el valor de la humedad 
    radio.sendString("H:" + hum + "%")
    // Envía el valor nivel de agua
    radio.sendNumber(nivelH2O)
})
// Función nivel de agua para verificar si hay inundación
function vigilaNivel () {
    // Mide el nivel de agua usando el sensor de nivel de agua a través del Pin 0
    nivelH2O = pins.analogReadPin(AnalogPin.P0)
    // Muestra el nivel de agua actual
    basic.showNumber(nivelH2O)
    basic.pause(1000)
    // Si el nivel de agua excede los 350, hay inundación, declarar la alarma de forma visual y sonora
    if (nivelH2O > 350) {
        // Alarma visual
        basic.showIcon(IconNames.No)
        // Alarma sonora 
        for (let index = 0; index < 4; index++) {
            music.playMelody("C D C D C D C D ", 120)
        }
    }
}
// Función para Vigilar el sensor DHT11 y la temperatura
function vigilaDHT11 () {
    // Establece la temperatura desde el sensor interno
    temp = input.temperature()
    // muestra la temperatura
    basic.showString("T:" + temp + "C")
    // pausa de 1 s
    basic.pause(1000)
    // mide la humedad desde el Pin2 usando el sensor DHT11
    hum = Environment.dht11value(Environment.DHT11Type.DHT11_humidity, DigitalPin.P2)
    // muestra la humedad
    basic.showString("H:" + hum + "%")
    // pausa 1 segundo
    basic.pause(1000)
    // Si la temperatura es mayor a 37 y la humedad inferior a 25, abre los 3 aspersores de agua en la zona de riego
    if (temp >= 37 && hum <= 25) {
        // Se riega por cuatro veces las zonas 
        for (let index = 0; index < 4; index++) {
            basic.showLeds(`
                . . # . .
                . . . . .
                . # . # .
                . . # . .
                # . . . #
                `)
        }
    }
}
let nivelH2O = 0
let hum = 0
let temp = 0
// Establece canal de comunicación entre las micro:bit en el canal 7
radio.setGroup(7)
basic.forever(function () {
    // llama la función VigilarDHT11
    vigilaDHT11()
    // Llama la función vigilar nivel de agua
    vigilaNivel()
})
