export default class UList {

    static buscarAtrib(idParam, dato, lista){
        let res = false;
        for(let i=0; i<lista.length; i++){
            if(lista[i][0][idParam]===dato){
                res = true;
            }
        }

        return res;
    }

    static esAdmin(lista){
        let res = false;
        for(let i=0; i<lista.length; i++){
            if(lista[i]===2){
                res = true;
            }
        }

        return res;
    }

    static esAdminUser(lista){
        let res = false;
        for(let i=0; i<lista.length; i++){
            if(lista[i]["Rol_Id_R"]===2){
                res = true;
            }
        }
        return res;
    }

    static funcionVerificada(id){
        let user = UList.recupUserLocal();
        let enabled = false;
        if(user){
            user.rol.forEach(element => {
                if(element.Id_F===id){
                    enabled = true;
                }
            });
        }
        return enabled;
    }

    static recupUserLocal(){
        const datosRecup = localStorage.getItem("datosUser");
        let user = null;
        if(datosRecup){
            user = JSON.parse(datosRecup);
        }
        return user;
    }

    static esSuFuncion(valor, lista){
        let res = false;
        for(let i=0; i<lista.length; i++){
            if(lista[i]["Id_F"]===valor){
                res = true;
            }
        }
        return res;
    }

    static esDocUser(lista){
        let res = false;
        for(let i=0; i<lista.length; i++){
            if(lista[i]["Rol_Id_R"]===1){
                res = true;
            }
        }
        return res;
    }

    static esDocAdmin(lista){
        return UList.esAdminUser(lista)&&UList.esDocUser(lista);
    }

    static juntarComunes(idParam, datos) {
        let res = [];
        for (let i = 0; i < datos.length; i++) {
            let lista = [datos[i]];
            let sig = true;
            let aux = i + 1;
            while (sig) {
                if (aux < datos.length) {
                    if (datos[aux][idParam] === lista[0][idParam]) {
                        lista.push(datos[aux]);
                        aux = aux + 1;
                    } else {
                        sig = false;
                    }
                } else {
                    sig = false;
                }
            }

            i = aux - 1;
            res.push(lista);
        }

        return res;
    }
}