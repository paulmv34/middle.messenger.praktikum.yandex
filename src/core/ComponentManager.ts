// отслеживание живых компонентов в целях отладки
import {Props, RefType} from "../types/types";
import Block from "./Block";

export const componentManager: Record<string, Block<Props, RefType>> = {};