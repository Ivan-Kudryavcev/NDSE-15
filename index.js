#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const yargs = require('yargs');
  yargs.command('current', '', (yargs) => {
    yargs.option('year', {
      alias: 'y',
      type: 'boolean',
      default: false,
      description: 'Текущий год'
    })
    .option('month', {
      alias: 'm',
      type: 'boolean',
      default: false,
      description: 'Текущий месяц',
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      default: false,
      description: 'Дата в календарном месяце'
    })
  }, function (argv) {
    console.log(argv);
    if (!argv.year && !argv.month && !argv.date && argv._.length >= 1) {
      console.log((new Date().getFullYear()+'-') + (new Date().getMonth()+1 > 9 ? new Date().getMonth()+1 : '0' + (new Date().getMonth()+1)) + ('-'+new Date().getDate()));
    }
    if(argv.year) {
      console.log(new Date().getFullYear());
    }
    if(argv.month) {
      console.log(new Date().getMonth()+1);
    }
    if(argv.date) {
      console.log(new Date().getDate());
    }
  })
  yargs.command('add', '', (yargs) => {
    yargs.option('month', {
      alias: 'm',
      type: 'boolean',
      default: false,
      description: 'Текущий месяц',
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      default: false,
      description: 'Дата в календарном месяце'
    })
  }, function (argv) {
    console.log(argv, 'add');
    if (argv._.length > 1) {
      if(argv.month) {
        if(new Date().getMonth()+1+argv._[1] > 12) {
          console.log('Error');
        } else {
          console.log((new Date().getFullYear()+'-') + (new Date().getMonth()+1+argv._[1] > 9 ? new Date().getMonth()+1+argv._[1]: '0' + (new Date().getMonth()+1+argv._[1])) + ('-'+new Date().getDate()));
        }
      }
      if(argv.date) {
        if(new Date().getDate()+argv._[1] > 31) {
          console.log('Error');
        } else {
          console.log((new Date().getFullYear()+'-') + (new Date().getMonth()+1 > 9 ? new Date().getMonth()+1: '0' + (new Date().getMonth()+1)) + ('-'+(new Date().getDate()+argv._[1])));
        }
      }
    }
  })
  yargs.command('sub', '', (yargs) => {
    yargs.option('month', {
      alias: 'm',
      type: 'boolean',
      default: false,
      description: 'Текущий месяц',
    })
    .option('date', {
      alias: 'd',
      type: 'boolean',
      default: false,
      description: 'Дата в календарном месяце'
    })
  }, function (argv) {
    console.log(argv, 'sub');
    if (argv._.length > 1) {
      if(argv.month) {
        console.log((new Date().getFullYear()+'-') + (new Date().getMonth()+1-argv._[1] > 9 ? new Date().getMonth()+1-argv._[1]: '0' + (new Date().getMonth()+1-argv._[1])) + ('-'+new Date().getDate()));
      }
      if(argv.date) {
        console.log((new Date().getFullYear()+'-') + (new Date().getMonth()+1 > 9 ? new Date().getMonth()+1: '0' + (new Date().getMonth()+1)) + ('-'+(new Date().getDate()-argv._[1])));
      }
    }
  })
  .help()
  .argv



function guessNumGame(rl) {
  const hideNum = Math.floor(Math.random()*100);
  console.log(`\nЗагадано число в диапазоне от 0 до 100 \n`);

  rl.on('line', (line) => {
    if (hideNum === (+line)) {
      console.log(`\nОтгадано число ${hideNum}\n`);
      rl.close();
    }
    else if(line === 'Z') {
      rl.close();
    }
    else if(+line < hideNum) {
      console.log('\nБольше\n');
    }
    else if(+line > hideNum) {
      console.log('\nМеньше\n');
    }
  });
}
if (yargs.argv._[0] === undefined) {
  const rl = readline.createInterface({ input, output });
  guessNumGame(rl);
}
