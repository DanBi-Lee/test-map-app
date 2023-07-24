export class DriveService {
  getPath(start: string, goal: string) {
    return fetch(`/api/driving?start=${start}&goal=${goal}`, {
      method: "GET",
    });
  }
}
