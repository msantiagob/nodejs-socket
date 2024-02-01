import bomberos from '../models/bomberos.js';
import compartir from '../models/compartir.js';
import ciudadela from '../models/ciudadela.js';
import santaRita from '../models/santaRita.js';
export default (io) => {
  io.on('connection', (socket) => {
    console.log('sockets connectados:', {
      Hora: socket.handshake.time,
      url: socket.handshake.headers.host,
      Devide: socket.handshake.address,
    });

    const emitSchedules = async () => {
      const Compartir = await compartir.find();
      const Bomberos = await bomberos.find();
      const Ciudadela = await ciudadela.find();
      const SantaRita = await santaRita.find();
      io.emit('loadSchedules', { Compartir, Bomberos, Ciudadela, SantaRita });
    };

    emitSchedules();
    socket.on('compartir', async (Compartir) => {
      const allCompartir = await compartir.find();
      const newCompartir = new compartir(Compartir);
      const savedCompartir = await newCompartir.save();

      socket.broadcast.emit('compartir', [
        {
          ...savedCompartir._doc,
        },
        ...allCompartir,
      ]);
      emitSchedules();
    });
    socket.on('bomberos:delete', async (scheduleId) => {
      const deleteBomberos = await bomberos.findByIdAndDelete(scheduleId);
      const allBomberos = await bomberos.find();

      socket.broadcast.emit('bomberos', [...allBomberos]);
      emitSchedules();
    });
    socket.on('bomberos', async (Bomberos) => {
      const allBomberos = await bomberos.find();
      const newBomberos = new bomberos(Bomberos);
      const savedBomberos = await newBomberos.save();

      socket.broadcast.emit('bomberos', [
        {
          ...savedBomberos._doc,
        },
        ...allBomberos,
      ]);
      emitSchedules();
    });
    socket.on('bomberos:delete', async (scheduleId) => {
      const deleteBomberos = await bomberos.findByIdAndDelete(scheduleId);
      const allBomberos = await bomberos.find();

      socket.broadcast.emit('bomberos', [...allBomberos]);
      emitSchedules();
    });
    socket.on('santa rita', async (SantaRita) => {
      const allSantaRita = await santaRita.find();
      const newSantaRita = new santaRita(SantaRita);
      const savedSantaRita = await newSantaRita.save();

      socket.broadcast.emit('santa rita', [
        {
          ...savedSantaRita._doc,
        },
        ...allSantaRita,
      ]);
      emitSchedules();
    });
    socket.on('santa rita:delete', async (scheduleId) => {
      const deleteSantaRita = await santaRita.findByIdAndDelete(scheduleId);
      const allSantaRita = await santaRita.find();

      socket.broadcast.emit('santa rita', [...allSantaRita]);
      emitSchedules();
    });
    socket.on('ciudadela', async (Ciudadela) => {
      const allCiudadela = await ciudadela.find();
      const newCiudadela = new ciudadela(Ciudadela);
      const savedBomberos = await newCiudadela.save();

      socket.broadcast.emit('ciudadela', [
        {
          ...savedBomberos._doc,
        },
        ...allCiudadela,
      ]);
      emitSchedules();
    });
    socket.on('ciudadela:delete', async (scheduleId) => {
      const deleteCiudadela = await ciudadela.findByIdAndDelete(scheduleId);
      const allCiudadela = await ciudadela.find();

      socket.broadcast.emit('ciudadela', [...allCiudadela]);
      emitSchedules();
    });
  });
};
