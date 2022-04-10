import http from "../http-common";
import IUser from "../types/User";

const getAll = () => {
    return http.get<Array<IUser>>("/users/");
};

const get = (name: any) => {
    return http.get<IUser>(`/users/${name}`);
};

const create = (data: IUser) => {
    return http.post<IUser>("/users/", data);
};

const update = (name: any, data: IUser) => {
    return http.put<any>(`/users/${name}`, data);
};

const remove = (name: any) => {
    return http.delete<any>(`/users/${name}`);
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
};
export default UserService;
