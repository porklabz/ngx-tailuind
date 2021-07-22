import {Rule, SchematicContext, Tree, SchematicsException} from '@angular-devkit/schematics';
import {getProjectFromWorkspace, getProjectStyleFile} from '@angular/cdk/schematics';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/workspace';
import {InsertChange} from '@schematics/angular/utility/change';
import {exec} from 'child_process';
import * as path from 'path';

export function ngAdd(options: any): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        const workspace = await getWorkspace(tree);
        if (!options.project) {
            options.project = workspace.extensions.defaultProject;
        }
        const project = getProjectFromWorkspace(workspace, options.project);
        const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
        const projectName = options.project || Object.keys(workspace.projects)[0];
        if (!project) {
            throw new SchematicsException(
                `Project ${projectName} is not defined in this workspace.`,
            );
        }
        if (options.path === undefined) {
            options.path = `${project.sourceRoot}/${projectType}`;
        }

        context.logger.info('Creating tailwind config...');
        const rootPath = path.join(__dirname, '..', '..', '..', '..');
        const cmd = 'cd ' + rootPath + ' && npx tailwindcss init';
        await exec(cmd);
        context.logger.info('Config for tailwind was created!');

        context.logger.info('Configuring styles...');

        if (!options.cssFormat) {
            options.cssFormat = 'scss';
        }

        const stylePath = getProjectStyleFile(project, options.cssFormat) as string;

        if (!stylePath) {
            context.logger.error(
                `Cannot update project styles file: Style path not found`,
            );
        }

        const buffer = tree.read(stylePath);
        if (buffer === null) {
            throw new SchematicsException('Could not find Style file');
        }
        const styleData = buffer.toString();
        let pos = -1;
        let willAppend = false;
        switch (true) {
            case (pos = styleData.search('@tailwind components;')) && pos >= 0:
                willAppend = true;
                pos = pos + 21;
                break;
            case (pos = styleData.search('@tailwind components')) && pos >= 0:
                willAppend = true;
                pos = pos + 20;
                break;
            default:
                const insertion = new InsertChange(
                    stylePath,
                    0,
                    `@tailwind base;
@tailwind components;

@import "~ngx-tailuind";

@tailwind utilities;
@tailwind screens;\n`
                );

                const recorder = tree.beginUpdate(stylePath);
                recorder.insertLeft(0, insertion.toAdd);
                tree.commitUpdate(recorder);
        }

        if (willAppend && styleData.search('ngx-tailuind') < 0) {
            const insertion = new InsertChange(
                stylePath,
                pos,
                `\n\n@import "~ngx-tailuind";\n`
            );

            const recorder = tree.beginUpdate(stylePath);
            recorder.insertLeft(pos, insertion.toAdd);
            tree.commitUpdate(recorder);
        }

        context.addTask(new NodePackageInstallTask());
    };
}
