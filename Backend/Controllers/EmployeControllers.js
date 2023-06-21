export const logout = async (req, res) => {
    const {userId, Badge} = req.body;
    
    try {
      let user;
      if(Badge === "Entreprise") {
        user = await Entreprise.findById(userId);
      }else{
        user = await Employe.findById(userId);
      }
      if (!user){
        throw Error('user not found!')
      }
        user.EnLigne = false;
        await user.save();
        
        res.status(200).json({ message:  "Déconnecté avec succès" });
        } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
  }
  };