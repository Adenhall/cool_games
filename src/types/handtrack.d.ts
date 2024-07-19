declare module "handtrackjs" {
  interface Prediction {
    class: number;
    label: string;
    score: string;
    bbox: number[];
  }
  interface Model {
    detect: (image: HTMLVideoElement) => Promise<Prediction[]>;
  }
  interface LoadParams {
    flipHorizontal: boolean;
    outputStride: number;
    imageScaleFactor: number;
    maxNumBoxes: number;
    iouThreshold: number;
    scoreThreshold: number;
    modelType: string;
    modelSize: string;
    bboxLineWidth: string;
    fontSize: number;
  }
  const load: (params: LoadParams) => Promise<Model>;

  const startVideo: (video: HTMLVideoElement) => Promise<void>;
  const stopVideo: (video: HTMLVideoElement) => Promise<void>;
}
