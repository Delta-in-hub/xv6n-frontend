import TypeIt from "@/components/ReTypeit";
import Tickets from "@iconify-icons/ep/tickets";
import User from "@iconify-icons/ri/user-3-fill";
import phone from "@iconify-icons/ri/phone-fill";
import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { type } from "os";

type TokenResult = {
  username: string;
  token: string;
};

const getTokenRequest = (data?: string) => {
  return http.request<TokenResult>("get", baseUrlApi("gettoken/" + data));
};

const getToken = async (username: string) => {
  let tk = "TOKEN 不存在，请刷新TOKEN";
  await getTokenRequest(username)
    .then(res => {
      if (res.username) tk = res.token;
    })
    .catch(err => {
      console.log(err);
    });
  return tk;
};

const token = await getToken(
  JSON.parse(sessionStorage.getItem("user-info"))["username"]
);

console.log(token);

export function useColumns() {
  const columnsA = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={User} />
          </el-icon>
          用户名
        </div>
      ),
      value: JSON.parse(sessionStorage.getItem("user-info"))["username"]
    }
  ];

  const columnsB = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={phone} />
          </el-icon>
          电话号码
        </div>
      ),
      value: JSON.parse(sessionStorage.getItem("user-info"))["phone"]
    }
  ];

  const columnsC = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Tickets} />
          </el-icon>
          TOKEN
        </div>
      ),
      value: token
    }
  ];

  return {
    columnsA,
    columnsB,
    columnsC
  };
}
