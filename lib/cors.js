import Cors from "cors";

// 미들웨어를 초기화하는 함수
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: "http://localhost:5173", // Vite 클라이언트의 도메인 주소
    credentials: true, // 필요한 경우 자격 증명 허용
  })
);

export default cors;
