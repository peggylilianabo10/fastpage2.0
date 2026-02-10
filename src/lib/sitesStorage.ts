import { db } from "./firebase";
import { adminDb } from "./firebaseAdmin";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  where,
  Timestamp 
} from "firebase/firestore";

type SiteData = {
  id: string;
  html: string;
  url: string;
  userId?: string;
  name?: string;
  type?: "Clonador" | "Constructor" | "Plantilla";
  createdAt: number;
  updatedAt?: number;
  published: boolean;
  publishedAt?: number;
  status?: "draft" | "published" | "archived";
  bundle?: any;
};

class SitesStorage {
  private static instance: SitesStorage;
  private collectionName = "cloned_sites";

  private constructor() {
    console.log("[SitesStorage] Initialized with Firebase Admin (Server Side)");
  }

  public static getInstance(): SitesStorage {
    if (!SitesStorage.instance) {
      SitesStorage.instance = new SitesStorage();
    }
    return SitesStorage.instance;
  }

  private isServer() {
    return typeof window === 'undefined';
  }

  public async set(id: string, data: Omit<SiteData, "id">): Promise<void> {
    console.log(`[SitesStorage] Saving site: ${id} (Server: ${this.isServer()})`);
    try {
      if (this.isServer() && adminDb) {
        await adminDb.collection(this.collectionName).doc(id).set({
          ...data,
          id,
          updatedAt: Date.now()
        });
      } else {
        // Fallback to client SDK if adminDb is not available or if on client
        await setDoc(doc(db, this.collectionName, id), {
          ...data,
          id,
          updatedAt: Date.now()
        });
      }
    } catch (error) {
      console.error("[SitesStorage] Error saving site:", error);
      throw error;
    }
  }

  public async get(id: string): Promise<SiteData | undefined> {
    console.log(`[SitesStorage] Retrieving site: ${id} (Server: ${this.isServer()})`);
    try {
      if (this.isServer() && adminDb) {
        const docSnap = await adminDb.collection(this.collectionName).doc(id).get();
        if (docSnap.exists) {
          return docSnap.data() as SiteData;
        }
      } else {
        const docSnap = await getDoc(doc(db, this.collectionName, id));
        if (docSnap.exists()) {
          return docSnap.data() as SiteData;
        }
      }
      return undefined;
    } catch (error: any) {
      console.error("[SitesStorage] Error getting site:", error);
      if (error.code === 'permission-denied') {
        throw new Error("No tienes permisos para acceder a este sitio.");
      }
      throw new Error(`Error al recuperar el sitio: ${error.message}`);
    }
  }

  public async getAll(): Promise<SiteData[]> {
    try {
      if (this.isServer() && adminDb) {
        const snapshot = await adminDb.collection(this.collectionName).get();
        return snapshot.docs.map(doc => doc.data() as SiteData);
      } else {
        const querySnapshot = await getDocs(collection(db, this.collectionName));
        return querySnapshot.docs.map(doc => doc.data() as SiteData);
      }
    } catch (error: any) {
      console.error("[SitesStorage] Error getting all sites:", error);
      throw new Error(`Error al recuperar la lista de sitios: ${error.message}`);
    }
  }

  public async update(id: string, html: string): Promise<boolean> {
    console.log(`[SitesStorage] Updating site: ${id} (Server: ${this.isServer()})`);
    try {
      if (this.isServer() && adminDb) {
        await adminDb.collection(this.collectionName).doc(id).update({ 
          html,
          updatedAt: Date.now()
        });
      } else {
        const siteRef = doc(db, this.collectionName, id);
        await updateDoc(siteRef, { 
          html,
          updatedAt: Date.now()
        });
      }
      return true;
    } catch (error: any) {
      console.error("[SitesStorage] Error updating site:", error);
      if (error.code === 'not-found') return false;
      throw new Error(`Error al actualizar el sitio: ${error.message}`);
    }
  }

  public async publish(id: string): Promise<boolean> {
    console.log(`[SitesStorage] Publishing site: ${id} (Server: ${this.isServer()})`);
    try {
      if (this.isServer() && adminDb) {
        await adminDb.collection(this.collectionName).doc(id).update({ 
          published: true, 
          publishedAt: Date.now() 
        });
      } else {
        const siteRef = doc(db, this.collectionName, id);
        await updateDoc(siteRef, { 
          published: true, 
          publishedAt: Date.now() 
        });
      }
      return true;
    } catch (error) {
      console.error("[SitesStorage] Error publishing site:", error);
      return false;
    }
  }
}

export const sitesStorage = SitesStorage.getInstance();
