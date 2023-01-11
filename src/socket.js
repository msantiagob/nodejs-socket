import bomberos from '../models/bomberos.js';
import ciudadela from '../models/ciudadela.js';
import santaRita from '../models/santaRita.js';
export default (io) => {
  io.on('connection', (socket) => {
    const emitSchedules = async () => {
      const Bomberos = await bomberos.find();
      const Ciudadela = await ciudadela.find();
      const SantaRita = await santaRita.find();
      io.emit('loadSchedules', { Bomberos, Ciudadela, SantaRita });
    };
    emitSchedules();

    socket.on('bomberos', async (Bomberos) => {
      const allBomberos = await bomberos.find();
      const newBomberos = new bomberos(Bomberos);
      const savedBomberos = await newBomberos.save();

      socket.broadcast.emit('bomberos', [
        {
          ...Bomberos,
        },
        ...allBomberos,
      ]);
    });
    socket.on('santa rita', async (SantaRita) => {
      const allSantaRita = await santaRita.find();
      const newSantaRita = new santaRita(SantaRita);
      const savedSantaRita = await newSantaRita.save();

      socket.broadcast.emit('santa rita', [
        {
          ...SantaRita,
        },
        ...allSantaRita,
      ]);
    });
    socket.on('ciudadela', async (Ciudadela) => {
      const allCiudadela = await ciudadela.find();
      const newCiudadela = new ciudadela(Ciudadela);
      const savedBomberos = await newCiudadela.save();

      socket.broadcast.emit('ciudadela', [
        {
          ...Ciudadela,
        },
        ...allCiudadela,
      ]);
    });
  });
};
