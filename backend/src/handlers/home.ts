import { Request, Response } from "express-serve-static-core"
import axios from "axios";

import { config } from "../config/config";
import { executeProgramDtos } from "../dtos/executeProgram.dtos"
import { LanguageConfig, Runtime } from "../types";

export const getRuntimes = async (request: Request, response: Response) => {
    const res = await axios.get(config.PISTON_URL + '/api/v2/runtimes');
    const data = res.data;

    const languageConfig: Record<string, LanguageConfig> = {
      javascript: {
        label: "JavaScript",
        monacoLanguage: "javascript",
        defaultCode: `
const numbers = [1, 2, 3, 4, 5];
        
// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`,
      },
      typescript: {
        label: "TypeScript",
        monacoLanguage: "typescript",
        defaultCode: `
interface NumberArray {
    numbers: number[];
    sum(): number;
    squares(): number[];
    evenNumbers(): number[];
  }
    
class MathOperations implements NumberArray {
  constructor(public numbers: number[]) {}

  sum(): number {
    return this.numbers.reduce((acc, curr) => acc + curr, 0);
  }

  squares(): number[] {
    return this.numbers.map(n => n * n);
  }

  evenNumbers(): number[] {
    return this.numbers.filter(n => n % 2 === 0);
  }
}

const math = new MathOperations([1, 2, 3, 4, 5]);

console.log('Original numbers:', math.numbers);
console.log('Squared numbers:', math.squares());
console.log('Even numbers:', math.evenNumbers());
console.log('Sum of numbers:', math.sum());`,
      },
      python: {
        label: "Python",
        monacoLanguage: "python",
        defaultCode: `
numbers = [1, 2, 3, 4, 5]
    
# Map numbers to their squares
squares = [n ** 2 for n in numbers]
print(f"Original numbers: {numbers}")
print(f"Squared numbers: {squares}")

# Filter for even numbers
even_numbers = [n for n in numbers if n % 2 == 0]
print(f"Even numbers: {even_numbers}")

# Calculate sum
numbers_sum = sum(numbers)
print(f"Sum of numbers: {numbers_sum}")`,
      },
      java: {
        label: "Java",
        monacoLanguage: "java",
        defaultCode: `
public class Main {
  public static void main(String[] args) {
    int[] numbers = {1, 2, 3, 4, 5};
    
    // Print original numbers
    System.out.print("Original numbers: ");
    printArray(numbers);
    
    // Calculate and print squares
    int[] squares = new int[numbers.length];
    for (int i = 0; i < numbers.length; i++) {
      squares[i] = numbers[i] * numbers[i];
    }
    System.out.print("Squared numbers: ");
    printArray(squares);
    
    // Print even numbers
    System.out.print("Even numbers: ");
    for (int n : numbers) {
      if (n % 2 == 0) System.out.print(n + " ");
    }
    System.out.println();
    
    // Calculate and print sum
    int sum = 0;
    for (int n : numbers) sum += n;
    System.out.println("Sum of numbers: " + sum);
  }
  
  private static void printArray(int[] arr) {
    for (int n : arr) System.out.print(n + " ");
    System.out.println();
  }
}`,
      },
      go: {
        label: "Go",
        monacoLanguage: "go",
        defaultCode: `
package main
import "fmt"

func main() {
  // Create slice
  numbers := []int{1, 2, 3, 4, 5}
  
  // Print original numbers
  fmt.Println("Original numbers:", numbers)
  
  // Calculate squares
  squares := make([]int, len(numbers))
  for i, n := range numbers {
    squares[i] = n * n
  }
  fmt.Println("Squared numbers:", squares)
  
  // Filter even numbers
  var evenNumbers []int
  for _, n := range numbers {
    if n%2 == 0 {
      evenNumbers = append(evenNumbers, n)
    }
  }
  fmt.Println("Even numbers:", evenNumbers)
  
  // Calculate sum
  sum := 0
  for _, n := range numbers {
    sum += n
  }
  fmt.Println("Sum of numbers:", sum)
}`,
      },
      rust: {
        label: "Rust",
        monacoLanguage: "rust",
        defaultCode: `
fn main() {
  // Create vector
  let numbers = vec![1, 2, 3, 4, 5];
  
  // Print original numbers
  println!("Original numbers: {:?}", numbers);
  
  // Calculate squares
  let squares: Vec<i32> = numbers
    .iter()
    .map(|&n| n * n)
    .collect();
  println!("Squared numbers: {:?}", squares);
  
  // Filter even numbers
  let even_numbers: Vec<i32> = numbers
    .iter()
    .filter(|&&n| n % 2 == 0)
    .cloned()
    .collect();
  println!("Even numbers: {:?}", even_numbers);
  
  // Calculate sum
  let sum: i32 = numbers.iter().sum();
  println!("Sum of numbers: {}", sum);
}`,
      },
      "c++": {
        label: "C++",
        monacoLanguage: "cpp",
        defaultCode: `
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
  // Create vector
  std::vector<int> numbers = {1, 2, 3, 4, 5};
  
  // Print original numbers
  std::cout << "Original numbers: ";
  for (int n : numbers) std::cout << n << " ";
  std::cout << std::endl;
  
  // Calculate squares
  std::vector<int> squares;
  std::transform(numbers.begin(), numbers.end(), 
    std::back_inserter(squares),
    [](int n) { return n * n; });
  
  std::cout << "Squared numbers: ";
  for (int n : squares) std::cout << n << " ";
  std::cout << std::endl;
  
  // Filter even numbers
  std::cout << "Even numbers: ";
  for (int n : numbers) {
    if (n % 2 == 0) std::cout << n << " ";
  }
  std::cout << std::endl;
  
  // Calculate sum
  int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
  std::cout << "Sum of numbers: " << sum << std::endl;
  
  return 0;
}`,
      },
      csharp: {
        label: "C#",
        monacoLanguage: "csharp",
        defaultCode: `
using System;
using System.Linq;

class Program {
  static void Main() {
    // Create array
    int[] numbers = { 1, 2, 3, 4, 5 };
    
    // Print original numbers
    Console.WriteLine($"Original numbers: {string.Join(" ", numbers)}");
    
    // Calculate squares
    var squares = numbers.Select(n => n * n);
    Console.WriteLine($"Squared numbers: {string.Join(" ", squares)}");
    
    // Filter even numbers
    var evenNumbers = numbers.Where(n => n % 2 == 0);
    Console.WriteLine($"Even numbers: {string.Join(" ", evenNumbers)}");
    
    // Calculate sum
    var sum = numbers.Sum();
    Console.WriteLine($"Sum of numbers: {sum}");
  }
}`,
      },
      ruby: {
        label: "Ruby",
        monacoLanguage: "ruby",
        defaultCode: `
numbers = [1, 2, 3, 4, 5]

# Print original numbers
puts "Original numbers: #{numbers.join(' ')}"

# Calculate squares
squares = numbers.map { |n| n * n }
puts "Squared numbers: #{squares.join(' ')}"

# Filter even numbers
even_numbers = numbers.select { |n| n.even? }
puts "Even numbers: #{even_numbers.join(' ')}"

# Calculate sum
sum = numbers.sum
puts "Sum of numbers: #{sum}"`,
      },
      swift: {
        label: "Swift",
        monacoLanguage: "swift",
        defaultCode: `
let numbers = [1, 2, 3, 4, 5]

// Print original numbers
print("Original numbers: \\(numbers)")

// Calculate squares
let squares = numbers.map { $0 * $0 }
print("Squared numbers: \\(squares)")

// Filter even numbers
let evenNumbers = numbers.filter { $0 % 2 == 0 }
print("Even numbers: \\(evenNumbers)")

// Calculate sum
let sum = numbers.reduce(0, +)
print("Sum of numbers: \\(sum)")`,
  },
      c: {
        label: "C",
        monacoLanguage: "c",
        defaultCode: `
#include <stdio.h>

int main() {
  // Create array
  int numbers[] = {1, 2, 3, 4, 5};
  int length = sizeof(numbers) / sizeof(numbers[0]);
  
  // Print original numbers
  printf("Original numbers: ");
  for (int i = 0; i < length; i++) {
    printf("%d ", numbers[i]);
  }
  printf("\\n");
  
  // Calculate squares
  printf("Squared numbers: ");
  for (int i = 0; i < length; i++) {
    printf("%d ", numbers[i] * numbers[i]);
  }
  printf("\\n");
  
  // Print even numbers
  printf("Even numbers: ");
  for (int i = 0; i < length; i++) {
    if (numbers[i] % 2 == 0) {
      printf("%d ", numbers[i]);
    }
  }
  printf("\\n");
  
  // Calculate sum
  int sum = 0;
  for (int i = 0; i < length; i++) {
    sum += numbers[i];
  }
  printf("Sum of numbers: %d\\n", sum);
  
  return 0;
}`,
      },
      d: {
        label: "D",
        monacoLanguage: "d",
        defaultCode: 
`import std.stdio;
      
void main() {
    // Create array
    int[] numbers = [1, 2, 3, 4, 5];
    
    // Print original numbers
    write("Original numbers: ");
    foreach (num; numbers) {
        write(num, " ");
    }
    writeln();
    
    // Calculate squares
    write("Squared numbers: ");
    foreach (num; numbers) {
        write(num * num, " ");
    }
    writeln();
    
    // Filter even numbers
    write("Even numbers: ");
    foreach (num; numbers) {
        if (num % 2 == 0) {
            write(num, " ");
        }
    }
    writeln();
    
    // Calculate sum
    int sum = 0;
    foreach (num; numbers) {
        sum += num;
    }
    writeln("Sum of numbers: ", sum);
}`,
      },
      fortran: {
        label: "Fortran",
        monacoLanguage: "fortran",
        defaultCode: 
`program main
    implicit none
    integer :: numbers(5)
    integer :: i, sum

    numbers = [1, 2, 3, 4, 5]

    ! Print original numbers
    write(*,*) 'Original numbers: ', numbers

    ! Calculate squares
    write(*,*) 'Squared numbers: '
    do i = 1, 5
        write(*,*) numbers(i)**2
    end do

    ! Filter even numbers
    write(*,*) 'Even numbers: '
    do i = 1, 5
        if (mod(numbers(i), 2) == 0) then
            write(*,*) numbers(i)
        end if
    end do

    ! Calculate sum
    sum = 0
    do i = 1, 5
        sum = sum + numbers(i)
    end do
    write(*,*) 'Sum of numbers: ', sum

end program main`,
      },
      
    };
    

    const updatedData: Runtime[] = data.map((language: Runtime) => {
        const config = languageConfig[language.language];
        if (config) {
            return {
                ...language,
                mocanoLanguageName: config.monacoLanguage,
                label: config.label,
                defaultCode: config.defaultCode,
            };
        }
        return language;
    });

    response.json({
        success: true,
        runtimes: updatedData
    })
}

export const executeProgram = async (request: Request<{}, {}, executeProgramDtos>, response: Response) => {
    const {language, version, content, stdin} = request.body;

    if(!language || !version || !content) {
        response.status(400).json({
            success: false,
            message: "Missing language/version/content field!"
        })
    }

    const payload = {
            language: language,
            version: version,
            files: [
                {
                    "name": "my_cool_code.js",
                    "content": content
                }
            ],
            stdin: stdin || "",
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_cpu_time: 10000,
            run_cpu_time: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
    }

    const programExecutionResult = await axios.post(config.PISTON_URL + "/api/v2/execute", payload)
    
    response.json({
        success: true,
        result: programExecutionResult.data
    })
}
