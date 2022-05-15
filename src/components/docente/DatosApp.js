export default class DatosApp{
    static getHorarios(){
        var datos = ["6:45", "7:30", "8:15", "9:00", "9:45", "10:30", "11:15", "12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00", "18:45", "19:30", "20:15", "21:00"];
        return datos;
    }

    static getHorariosFin(){
        var datos = ["7:30", "8:15", "9:00", "9:45", "10:30", "11:15", "12:00", "12:45", "13:30", "14:15", "15:00", "15:45", "16:30", "17:15", "18:00", "18:45", "19:30", "20:15", "21:00", "21:45"];
        return datos;
    }

    static getDatosMateria(){
        var datos = ["Introduccion a la programacion", "Elementos de programacion", "Taller de Ingenieria de sotfware", "Arquitectura de computadoras"];
        return datos;
    }
}