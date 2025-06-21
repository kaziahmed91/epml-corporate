'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  name: string;
  slug: string;
}

interface UploadResult {
  success: boolean;
  file?: {
    key: string;
    url: string;
    size: number;
    contentType: string;
    originalName: string;
    etag: string;
  };
  error?: {
    message: string;
  };
}

export default function DocumentUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [category, setCategory] = useState('Brochure');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');

        if (response.ok) {
          const data = await response.json();
          setProjects(data.data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Auto-populate document name with filename (without extension)
      const nameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");
      setDocumentName(nameWithoutExtension);
      setResult(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!documentName.trim()) {
      alert('Please enter a document name');
      return;
    }

    if (!projectId) {
      alert('Please select a project');
      return;
    }

    setUploading(true);
    setResult(null);

    try {
      // Step 1: Upload file to R2 using Next.js API route
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId);
      formData.append('category', category);

      const r2Response = await fetch('/api/upload-r2', {
        method: 'POST',
        body: formData
      });

      const r2Data = await r2Response.json();

      if (!r2Response.ok) {
        throw new Error(r2Data.error || 'R2 upload failed');
      }

      // Step 2: Create document entry in Strapi with R2 data
      await updateProjectWithDocument(projectId, r2Data.file);
      
      setResult({ 
        success: true, 
        file: r2Data.file
      });

    } catch (error) {
      setResult({
        success: false,
        error: { message: `Upload error: ${error instanceof Error ? error.message : 'Unknown error'}` }
      });
    } finally {
      setUploading(false);
    }
  };

  const updateProjectWithDocument = async (projectId: string, fileInfo: any) => {
    try {
      // Create a new document entry in Strapi with R2 data
      const documentResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            name: documentName.trim(),
            description: `Document: ${documentName.trim()}`,
            r2Key: fileInfo.key,
            r2Url: fileInfo.url,
            originalName: fileInfo.originalName,
            category: category,
            fileSize: fileInfo.size,
            mimeType: fileInfo.contentType,
            uploadedAt: new Date().toISOString(),
            project: parseInt(projectId),
            isPublic: false,
            displayOrder: 0
          }
        })
      });

      if (documentResponse.ok) {
        const documentData = await documentResponse.json();
        console.log('✅ Document successfully linked to project:', documentData);
        alert(`✅ Document "${documentName.trim()}" successfully linked to project! Document ID: ${documentData.data?.id}`);
      } else {
        const errorData = await documentResponse.json();
        console.error('❌ Failed to link document to project:', errorData);
        alert(`❌ Failed to link document to project: ${errorData.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to update project with document:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Document Upload</h1>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Select Document (up to 100MB)
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.dwg,.dxf"
                required
              />
            </div>

            <div>
              <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-2">
                Document Name *
              </label>
              <input
                type="text"
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter a descriptive name for the document"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              {loadingProjects ? (
                <div className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                  Loading projects...
                </div>
              ) : (
                <select
                  id="projectId"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a project *</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Brochure">Brochure</option>
                <option value="Floor Plans">Floor Plans</option>
                <option value="Permits">Permits</option>
                <option value="Legal Documents">Legal Documents</option>
                <option value="Specifications">Specifications</option>
                <option value="Architectural Drawings">Architectural Drawings</option>
                <option value="Construction Documents">Construction Documents</option>
                <option value="Marketing Materials">Marketing Materials</option>
                <option value="Terms & Conditions">Terms & Conditions</option>
                <option value="Approvals">Approvals</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={!file || !documentName.trim() || !projectId || uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </form>

          {result && (
            <div className="mt-8 p-4 rounded-md">
              {result.success ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-green-800 mb-2">✅ Upload Successful!</h3>
                  <div className="space-y-1 text-sm text-green-700">
                    <p><strong>File URL:</strong> <a href={result.file?.url} target="_blank" rel="noopener noreferrer" className="underline">{result.file?.url}</a></p>
                    <p><strong>File Key:</strong> {result.file?.key}</p>
                    <p><strong>Size:</strong> {result.file?.size} bytes</p>
                    <p><strong>Content Type:</strong> {result.file?.contentType}</p>
                    <p><strong>Original Name:</strong> {result.file?.originalName}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <h3 className="text-lg font-medium text-red-800 mb-2">❌ Upload Failed</h3>
                  <p className="text-sm text-red-700">{result.error?.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}