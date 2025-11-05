import jwt from "jsonwebtoken";

const SECRET_KEY_ACCESS_TOKEN = 'MY-KEY-ACCESS-T';
const SECRET_KEY_REFRESH = 'MY-KEY-REFRESH-T';

export async function POST(req) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return new Response(JSON.stringify({ error: "No se proporcionó refreshToken" }), { status: 400 });
    }

    let user;
    try {
      user = jwt.verify(refreshToken, SECRET_KEY_REFRESH);
    } catch {
      return new Response(JSON.stringify({ error: "Refresh token inválido o expirado" }), { status: 401 });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: "30m" }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      SECRET_KEY_REFRESH,
      { expiresIn: "1h" }
    );

    return Response.json({
      message: "Token refrescado correctamente",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error interno del servidor", { status: 500 });
  }
}
