import empModel from "../models/Empleados.js"

const empCon={};

empCon.get = async (req,res) =>{
    const empleado = await empModel.find();
    res.json(empleado);
}

empCon.put = async (req,res) =>{
    const {nombre,correo,contrasena,telefono,dirreccion,puesto,fehcaContra,salario,DUI}=req.body;
    await empModel.findByIdAndUpdate(
        req.params.id,{
            nombre,
            correo,
            contrasena,
            telefono,
            dirreccion,
            puesto,
            fehcaContra,
            salario,
            DUI
        },{new:true}
    );
    res.json({message:"Empleado acttualizado con exito"})
};

empCon.delete = async (req,res) =>{
    const deleteemp = await empModel.findByIdAndDelete(req.params.id);
    if(!deleteemp){
        return res.status(404).json({message:"pelicula no encontrada"});
    }
    res.json({message: "empleado eliminado con exito"});
};

export default empCon;