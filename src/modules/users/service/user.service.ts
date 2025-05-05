import { DataSource, Repository } from 'typeorm';

import { Injectable, OnModuleInit } from '@nestjs/common';

import { CustomerEntity } from '../entities/customer.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly userRepository: Repository<UserEntity>;
  private readonly customerRepository: Repository<CustomerEntity>;

  constructor(private dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(UserEntity);
    this.customerRepository = this.dataSource.getRepository(CustomerEntity);
  }

  async onModuleInit() {
    const existingCustomers = await this.customerRepository.count();
    const existingUsers = await this.userRepository.count();

    if (existingCustomers === 0 && existingUsers === 0) {
      const customer = await this.customerRepository.save({
        name: 'Customer A',
        status: true,
      });

      await this.userRepository.save([
        {
          username: 'David',
          status: true,
          customer: customer,
        },
        {
          username: 'Carlos',
          status: true,
          customer: customer,
        },
        {
          username: 'Juan',
          status: false,
          customer: customer,
        },
      ]);
    }
  }

  async findAllUsersWithCustomer(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['customer'],
    });
  }
}
