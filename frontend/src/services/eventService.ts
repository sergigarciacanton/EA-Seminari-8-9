import http from "../http-common";
import IEvent from "../types/event";

const getAll = () => {
  return http.get<Array<IEvent>>("/events/");
};

const get = (name: any) => {
  return http.get<IEvent>(`/events/${name}`);
};

const create = (data: IEvent) => {
  return http.post<IEvent>(`/events/${data.idAdmin}`, data);
};

const update = (name: any, data: IEvent) => {
  return http.put<any>(`/events/${name}`, data);
};

const remove = (name: any) => {
  return http.delete<any>(`/events/${name}`);
};

const EventService = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default EventService;
