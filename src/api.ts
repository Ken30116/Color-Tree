import axios from 'axios';
type LabelObject = { label: string };
class API {
  postDataTotal() {
    const formData = new FormData();
    Object.entries({
      action: 'data-total',
    }).forEach(([key, value]: [string, string]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postDataInRange(start: number, end: number) {
    const formData = new FormData();
    Object.entries({
      action: 'data-in-range',
      start: start,
      end: end,
    }).forEach(([key, value]: [string, string | number]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postLabelData(isLabelAll: boolean, label: LabelObject[]) {
    const formData = new FormData();
    const labels = label.map((obj) => obj.label);
    Object.entries({
      action: 'lable-data',
      type: isLabelAll,
      label: labels,
    }).forEach(([key, value]: [string, string | string[] | boolean]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postNameData(name: string) {
    const formData = new FormData();
    Object.entries({
      action: 'name-data',
      name: name,
    }).forEach(([key, value]: [string, string]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postHexData(hex: string) {
    const formData = new FormData();
    Object.entries({
      action: 'hex-data',
      hex: hex,
    }).forEach(([key, value]: [string, string]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postRgbData(rgb: string) {
    const formData = new FormData();
    Object.entries({
      action: 'rgb-data',
      rgb: rgb,
    }).forEach(([key, value]: [string, string]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
  postCMYKData(CMYK: string) {
    const formData = new FormData();
    Object.entries({
      action: 'CMYK-data',
      CMYK: CMYK,
    }).forEach(([key, value]: [string, string]) => {
      formData.append(key, value.toString());
    });
    return axios.post(import.meta.env.VITE_API_URL, formData);
  }
}
export default new API();
