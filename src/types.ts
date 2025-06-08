export type Project = {
  id: string;
  icon: string | undefined;
  thumbnail: string | undefined;
  title: string;
  description?: string;
  tags: string[];
  folders: Folder[];
  tasks: Task[];
  note: string;
  isFavorite: boolean;
  commands: Command[];
};

export type Command = {
  title: string;
  command: string;
};

export type Task = {
  id: string;
  name: string;
  isDone: boolean;
};

export type Folder = {
  id: string;
  name: string;
  path: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
};
