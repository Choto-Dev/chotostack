import consola from 'consola';
import { downloadTemplate } from 'giget';

/**
 * Create the base files of the project
 * @param projectPath Root directory of the project
 */
async function createBaseProject(projectPath: string) {
  consola.start('Creating files...');
  await downloadTemplate('github:Choto-Dev/chotostack/templates/base', {
    dir: projectPath,
  })
    .then(() => {
      consola.success('Files created successfully');
    })
    .catch((error) => {
      consola.fail('Failed to create files');
      consola.log('');
      consola.fail(error);
    });
}

export { createBaseProject };
