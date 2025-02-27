import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // const authHeader = req.header("Authorization");
  // const token = authHeader?.split(" ")[1]; // Extract token after "Bearer "

  // if (!token) {
  //   return res.status(401).json({ error: "Access denied" });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded; // Attach user data to the request
  //   next(); // Proceed to the route handler
  // } catch (error) {
  //   console.error("JWT Error:", error.message);
  //   res.status(401).json({ error: "Invalid token" });
  // }

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // Attach admin info to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

/**My Understadnign of this code:
 * this is a vertification middleware '
 * mosty will be used in the admin in any route 
 * first user will send req to the desired endpoin
 * that endpoint will have this jwt middlewar
 * first this middleware will be passed the request 
 * before passing to the actual route 
 * we are checking if the user passed any token in hteheader
 * if not then we re drectly sednign responce to the user
 * ratehr forwarding the rqu to the endpoin
 * if token is passed 
 * if the jwt vertified is wiht the jwt secret key it will
 * forward the req to the desired route
 * if token is not valid  then it will send res to the user saying not valid token
 * this middleware is nott supposed to send respone
 * it should forware to the actual desired routed 
 * if the verification is sucessfll it will call next and acutl route can be accessed by the user
 * 
 
*/
