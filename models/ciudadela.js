import { Schema, model } from 'mongoose';
import Model from './model.js';
const schema = new Schema(Model);

export default model('Ciudadela', schema);
