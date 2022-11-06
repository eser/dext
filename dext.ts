import {
  type Command,
  CommandType,
  ValueType,
  execute,
  ExecuteOptions,
  showHelp,
  showVersion,
} from "https://deno.land/x/hex/src/cli/mod.ts";
import { create } from "https://deno.land/x/dextfw/src/generator/create.ts";
import metadata from "https://deno.land/x/dextfw/src/metadata.json" assert { type: "json" };

const upgradeCli = async (_args: string[], _options: ExecuteOptions) => {
  const p = Deno.run({
    cmd: ["deno", "install", "-A", "-r", "-f", "https://deno.land/x/dextfw/dext.ts"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "null",
  });

  await p.status();
};

const run = async (args: string[], _options: ExecuteOptions) => {
  const p = Deno.run({
    cmd: ["deno", "run", "-A", "--unstable", "src/main.ts", ...args],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "null",
  });

  await p.status();
};

const test = async (_args: string[], _options: ExecuteOptions) => {
  const p = Deno.run({
    cmd: ["deno", "task", "test"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "null",
  });

  await p.status();
};

const dextCli = async () => {
  const executeOptions: ExecuteOptions = {
    command: "dext",
    module: import.meta.url,
  };

  const commands: Command[] = [
    {
      type: CommandType.SubCommand,
      name: "upgrade",
      // shortcut: "u",
      description: "Upgrades dext cli to the latest version",
      isDefault: true,

      run: (args: string[]) => upgradeCli(args, executeOptions),
    },
    {
      type: CommandType.SubCommand,
      name: "create",
      shortcut: "c",
      description: "Initialize a new project",

      subcommands: [
        {
          type: CommandType.Option,
          name: "template",
          shortcut: "t",
          description: "The template to use",
          defaultValue: "default",
          valueType: ValueType.String,
        },
      ],

      run: (args: string[]) => create(args, executeOptions),
    },
    {
      type: CommandType.SubCommand,
      name: "run",
      // shortcut: "r",
      description: "Runs the project",

      subcommands: [
        {
          type: CommandType.Option,
          name: "reload",
          shortcut: "r",
          description: "Reloads all modules before running",
          defaultValue: false,
          valueType: ValueType.Boolean,
        },
      ],

      run: (args: string[]) => run(args, executeOptions),
    },
    {
      type: CommandType.SubCommand,
      name: "test",
      // shortcut: "t",
      description: "Runs tests of the project",

      run: (args: string[]) => test(args, executeOptions),
    },
    {
      type: CommandType.Option,
      name: "help",
      shortcut: "h",
      description: "Display help information",

      run: () => showHelp(commands, metadata.version, executeOptions),
    },
    {
      type: CommandType.Option,
      name: "version",
      shortcut: "V",
      description: "Display version information",

      run: () => showVersion(metadata.version),
    },
  ];

  const args = (typeof Deno !== "undefined") ? Deno.args : [];

  execute(commands, args, executeOptions);
};

if (import.meta.main) {
  dextCli();
}

export { dextCli as default, dextCli, run, test, upgradeCli };
