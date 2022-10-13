import md5 from 'md5'
const salt = "ramdom_str";
export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'

  constructor() {
    let id = md5(Date.now()+salt)
    this.id = md5(Date.now()+salt)
    this.title = "";
    this.description = "";
    this.status = Task.TS_INCOMPLETED;
  }
}
