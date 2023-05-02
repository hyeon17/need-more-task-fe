import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IJoinInfoStore {}

const joinInfoStore = create()(devtools((set) => ({})));
