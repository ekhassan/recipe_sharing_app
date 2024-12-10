import { UploadClient } from '@uploadcare/upload-client';

const client = new UploadClient({ publicKey: import.meta.env.VITE_UPLOAD_CARE_KEY });


export default client;