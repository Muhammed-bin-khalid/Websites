import { NextResponse } from 'next/server';
import { getAllProjects, createProject } from '@/lib/projects';

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { title, description, imageUrl, liveUrl, technologies, completionDate } = data;

    if (!title || !description || !imageUrl || !technologies || !completionDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const project = await createProject({
      title,
      description,
      imageUrl,
      liveUrl: liveUrl || undefined,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map((t: string) => t.trim()),
      completionDate,
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error('Failed to create project:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create project' },
      { status: 500 }
    );
  }
}
