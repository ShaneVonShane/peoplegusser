import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Stranger } from '../types';

export interface SubmittedFace {
  id?: string;
  name: string;
  imageUrl: string;
  category?: string;
  occupation?: string;
  origin?: string;
  funFact?: string;
  gender?: 'male' | 'female' | 'any';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  submittedBy?: string;
}

const COLLECTION_NAME = 'submitted_faces';

/**
 * Submit a new face for moderation (Status: pending)
 */
export async function submitFace(
  faceData: Omit<SubmittedFace, 'id' | 'status' | 'createdAt'>
): Promise<string> {
  const newRecord: Omit<SubmittedFace, 'id'> = {
    ...faceData,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), newRecord);
  return docRef.id;
}

/**
 * Fetch all approved faces from Firestore
 */
export async function fetchApprovedFaces(): Promise<Stranger[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'approved')
    );
    const querySnapshot = await getDocs(q);
    const faces: Stranger[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as SubmittedFace;
      faces.push({
        id: `firebase-${docSnap.id}`,
        name: data.name,
        photoUrl: data.imageUrl,
        category: data.category || 'Community',
        occupation: data.occupation || 'Community Submission',
        origin: data.origin || 'Community',
        funFact: data.funFact || undefined,
        gender: data.gender || 'any',
        isCustom: true,
      });
    });

    return faces;
  } catch (err) {
    console.error('Error fetching approved faces:', err);
    return [];
  }
}

/**
 * Fetch submitted faces for Admin Moderation
 */
export async function fetchSubmittedFaces(statusFilter?: 'pending' | 'approved' | 'rejected' | 'all'): Promise<SubmittedFace[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    let q;

    if (statusFilter && statusFilter !== 'all') {
      q = query(colRef, where('status', '==', statusFilter));
    } else {
      q = query(colRef);
    }

    const querySnapshot = await getDocs(q);
    const items: SubmittedFace[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data() as DocumentData;
      items.push({
        id: docSnap.id,
        name: data.name || '',
        imageUrl: data.imageUrl || '',
        category: data.category || 'Community',
        occupation: data.occupation || '',
        origin: data.origin || '',
        funFact: data.funFact || '',
        gender: data.gender || 'any',
        status: data.status || 'pending',
        createdAt: data.createdAt || new Date().toISOString(),
        submittedBy: data.submittedBy || 'Anonymous Visitor',
      });
    });

    // Sort newest first client side if needed
    items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return items;
  } catch (err) {
    console.error('Error fetching submitted faces for moderation:', err);
    throw err;
  }
}

/**
 * Update face moderation status
 */
export async function updateFaceStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
}

/**
 * Edit face details in Firestore
 */
export async function updateFaceDetails(id: string, updates: Partial<SubmittedFace>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updates);
}

/**
 * Delete a face submission
 */
export async function deleteFaceSubmission(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
