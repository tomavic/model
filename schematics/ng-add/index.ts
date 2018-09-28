import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import packageJson from '../../package.json';
import { addPackageToPackageJson } from '../utils';

import { Schema as NgAddOptions } from './schema';

export default function(options: NgAddOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    const version = packageJson.version;
    addPackageToPackageJson(host, '@angular-extensions/model', `^${version}`);
    context.logger.log(
      'info',
      `✅️ Added "@angular-extensions/model@^${version}" into dependencies`
    );

    if (options.skipInstall) {
      context.logger.log(
        'warn',
        `⚠️️ The "--skip-install" flag was present, don't forget to install package manually`
      );
    } else {
      context.logger.log('info', `✅️ Installing added packages...`);
      context.addTask(new NodePackageInstallTask());
    }
    return host;
  };
}
