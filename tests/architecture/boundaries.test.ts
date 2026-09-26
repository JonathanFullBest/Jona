// @vitest-environment node
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

async function boundaryViolations(probePath: string, code: string) {
  mkdirSync(dirname(probePath), { recursive: true });
  writeFileSync(probePath, code);
  try {
    const [result] = await new ESLint().lintFiles([probePath]);
    if (!result) throw new Error(`ESLint no devolvió resultado para ${probePath}`);
    expect(result.fatalErrorCount).toBe(0);
    return result.messages.filter((m) => m.ruleId?.startsWith('boundaries/'));
  } finally {
    rmSync(probePath);
  }
}

describe('fronteras entre módulos', () => {
  it('app importa un módulo por su index', async () => {
    const violations = await boundaryViolations(
      'src/app/BoundaryProbe.tsx',
      "export { Navbar } from '../modules/landing';\n",
    );
    expect(violations).toEqual([]);
  });

  it('app no importa internos de un módulo', async () => {
    const violations = await boundaryViolations(
      'src/app/BoundaryProbe.tsx',
      "export { default } from '../modules/landing/ui/public/Navbar/Navbar';\n",
    );
    expect(violations).not.toEqual([]);
  });

  it('un módulo no importa app', async () => {
    const violations = await boundaryViolations(
      'src/modules/landing/BoundaryProbe.tsx',
      "export { default } from '../../app/App';\n",
    );
    expect(violations).not.toEqual([]);
  });

  it('un módulo importa sus propios internos', async () => {
    const violations = await boundaryViolations(
      'src/modules/landing/BoundaryProbe.tsx',
      "export { default } from './ui/public/Navbar/Navbar';\n",
    );
    expect(violations).toEqual([]);
  });
});
