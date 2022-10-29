class TagDTO {
  id: number;
  label: string;
  frequency: number;

  constructor(id: number, label: string, frequency: number) {
    this.id = id;
    this.label = label;
    this.frequency = frequency;
  }
}

export default TagDTO