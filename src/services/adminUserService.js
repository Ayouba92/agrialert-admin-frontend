import api from "../api/axios";

export const adminUserService = {
  // GET /api/admin/users
  list: async () => {
    const res = await api.get("/admin/users");
    // Le backend va renvoyer soit {users:[...]} soit [...]
    return res.data?.users ?? res.data;
  },

  // DELETE /api/admin/users/{id}
  remove: async (id) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  // PATCH /api/admin/users/{id}/status
  toggleStatus: async (id) => {
    const res = await api.patch(`/admin/users/${id}/status`);
    return res.data;
  },

  // PUT /api/admin/users/{id}
  update: async (id, payload) => {
    const res = await api.put(`/admin/users/${id}`, payload);
    return res.data;
  },
};