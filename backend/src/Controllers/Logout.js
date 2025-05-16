const LogoutCon= {};
LogoutCon.logout = async (req,res) => {
    res.clearCookie("AuthToken");

    return res.json({message : "Sesion cerrada"});
}

export default LogoutCon;