const { Activities } = require('../../models');
const { Op } = require('sequelize');

// Tambahkan parameter id untuk pengecekan spesifik activity
const GetActivities = async (id = null, query = {}, search = '') => {
  // Jika id disediakan, kembalikan activity berdasarkan id
  if (id) {
    try {
      const activity = await Activities.findByPk(id); // Cari berdasarkan primary key (id)
      if (!activity) {
        throw new Error(`Activity dengan id ${id} tidak ditemukan`);
      }
      return activity; // Kembalikan detail activity
    } catch (error) {
      throw new Error(`Gagal mengambil data activity: ${error.message}`);
    }
  }

  // Logika untuk pencarian semua activities
  const page = query.page || 1;  // Ambil nilai halaman dari query params (default 1)
  const limit = query.limit || 10;  // Ambil nilai limit dari query params (default 10)
  const offset = (page - 1) * limit;  // Hitung offset berdasarkan page dan limit
  
  const options = {
    where: {},
    limit,
    offset,
    order: [['createdAt', 'DESC']],  // Urutkan berdasarkan tanggal dibuat secara descending
  };

  // Jika ada pencarian, gunakan filter title pada activity
  if (search) {
    options.where.title = { [Op.like]: `%${search}%` };
  }

  try {
    const { rows, count } = await Activities.findAndCountAll(options);

    return {
      data: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    throw new Error(`Gagal mengambil data activity: ${error.message}`);
  }
};

module.exports = GetActivities;
