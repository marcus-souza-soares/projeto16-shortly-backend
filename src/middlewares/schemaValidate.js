
export function schemaValidate(schema){
    const verification = (req, res, next) => {
        const dados = req.body;
        const {error} = schema.validate(dados, {abortEarly: false});
        if (error) {
          return res.status(422).send(error.details.map(detail => detail.message));
        }
        next();
      }
      return verification;
}