class TagDTO {
  id: number;
  label: string;
  freq: number;

  constructor(id: number, label: string, freq: number) {
    this.id = id;
    this.label = label;
    this.freq = freq;
  }
}

export default TagDTO