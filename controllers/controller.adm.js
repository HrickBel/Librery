https://youtu.be/TeFiIjMIlRw?si=kvRb1Ieo_R-_RjuK
const create = async(req,res) => {
	await adm.create({
		matricula:req.body.mat,
		name:req.body.name,
		email:req.body.mail,
		password:md5(req.body.password),
		isMatActive: true
	});
